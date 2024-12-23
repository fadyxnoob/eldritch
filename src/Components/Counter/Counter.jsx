import React, { useEffect, useRef, useState } from 'react';
import DatabaseService from '../../Admin/Appwrite/Database';
import Config from '../../Config/Config';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Counter = () => {
    const [announce, setAnnounce] = useState(true);
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [endTime, setEndTime] = useState(null);
    const collection = Config.appWriteManageTimerCollID;
    const documentID = "674eda5100217e08f20e";

    const counterRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(counterRef.current, {
                duration: 0.8,
                opacity: 0,
                xPercent: -100,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
            gsap.from(counterRef.current.children[0].children[0], {
                opacity: 0,
                y: -150,
                duration: 0.6,
                delay: 0.3,
                scale: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
            gsap.from(counterRef.current.children[0].children[1].children[0], {
                opacity: 0,
                xPercent: -100,
                duration: 0.8,
                delay: 0.6,
                scale: 0.2,
                rotate: -360,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
            gsap.from(counterRef.current.children[0].children[1].children[3], {
                opacity: 0,
                xPercent: 100,
                duration: 0.8,
                delay: 0.6,
                scale: 0.2,
                rotate: 360,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
            gsap.from(counterRef.current.children[0].children[1].children[1], {
                opacity: 0,
                yPercent: 100,
                duration: 0.8,
                delay: 0.6,
                scale: 0.2,
                rotate: 360,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
            gsap.from(counterRef.current.children[0].children[1].children[2], {
                opacity: 0,
                yPercent: -100,
                duration: 0.8,
                delay: 0.6,
                scale: 0.2,
                rotate: -360,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: 'top 50%',
                    end: 'bottom top',
                    toggleActions: 'play none none none',
                }
            })
        })

        return () => ctx.revert();

    }, [])
    // Fetch timer data from the database
    const fetchTimerData = async () => {
        try {
            const res = await DatabaseService.getDocument(documentID, collection);
            if (res && res.endTime) {
                const endTimeFromDB = new Date(res.endTime).getTime();
                setEndTime(endTimeFromDB);
            } else {
                console.error("Invalid or missing timer data in the database.");
            }
        } catch (error) {
            console.error("Failed to fetch timer data:", error);
        }
    };

    // Update time state based on the current time and end time
    const calculateRemainingTime = () => {
        if (!endTime) return;

        const now = new Date().getTime();
        const timeDiff = endTime - now;

        if (timeDiff <= 0) {
            setAnnounce(false);
            setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTime({ days, hours, minutes, seconds });
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTimerData();
    }, []);

    // Start countdown logic
    useEffect(() => {
        if (!endTime) return;

        const interval = setInterval(() => {
            calculateRemainingTime();
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <div ref={counterRef} className='counterSection p-5'>
            <div className="content size-full flex items-center justify-center flex-col">
                <h3 className='text-3xl md:text-5xl text-light text-center font-semibold mb-10'>
                    {announce ? 'Tournament Start' : 'Entries Closed'}
                </h3>
                {announce && ( // Conditional rendering based on `announce` state
                    <div className="counting flex flex-row gap-5">
                        <div
                            className="days size-14 sm:size-20 md:size-28 px-5 rounded bg-primary text-light flex items-center justify-center sm:text-xl md:text-3xl font-semibold p-2 text-center">
                            {time.days} Days
                        </div>
                        <div
                            className="hours size-14 sm:size-20 md:size-28 px-5 rounded bg-primary text-light flex items-center justify-center sm:text-xl md:text-3xl font-semibold p-2 text-center">
                            {time.hours} Hours
                        </div>
                        <div
                            className="mins size-14 sm:size-20 md:size-28 px-5 rounded bg-primary text-light flex items-center justify-center sm:text-xl md:text-3xl font-semibold p-2 text-center">
                            {time.minutes} Mins
                        </div>
                        <div
                            className="secs size-14 sm:size-20 md:size-28 px-5 rounded bg-primary text-light flex items-center justify-center sm:text-xl md:text-3xl font-semibold p-2 text-center">
                            {time.seconds} Secs
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Counter);
