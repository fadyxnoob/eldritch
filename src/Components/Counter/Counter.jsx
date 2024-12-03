import React, { useEffect, useState, useCallback } from 'react';
import { setLocalStorage, getLocalStorage } from '../../LocalStorage/LocalStorage';

const Counter = () => {
    const [announce, setAnnounce] = useState(true);
    const [time, setTime] = useState(null);

    const fetchDataFromDB = useCallback(async () => {
        const savedTime = getLocalStorage('timerData');
        if (savedTime) {
            setTime(savedTime);
        }
    }, []);

    useEffect(() => {
        fetchDataFromDB();
    }, [fetchDataFromDB]);

    useEffect(() => {
        if (!time) return;
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (!prevTime) return prevTime;
                const { days, hours, minutes, seconds } = prevTime;
                let updatedTime;

                if (seconds > 0) {
                    updatedTime = { ...prevTime, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    updatedTime = { ...prevTime, minutes: minutes - 1, seconds: 59 };
                } else if (hours > 0) {
                    updatedTime = { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
                } else if (days > 0) {
                    updatedTime = { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(interval);
                    setAnnounce(false);
                    return null;
                }
                setLocalStorage('timerData', updatedTime); 
                return updatedTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    // Render loading state if time is still `null`

    return (
        <div className='counterSection p-5'>
            <div className="content size-full flex items-center justify-center flex-col">
                <h3 className='text-5xl text-light text-center font-semibold mb-10'>
                    {announce ? 'Tournament Start' : 'Entries Closed'}
                </h3>
                {
                    announce && time && (
                        <div className="counting flex flex-col md:flex-row gap-5">
                            <div className="days h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                                {time.days} Days
                            </div>
                            <div className="hours h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                                {time.hours} Hours
                            </div>
                            <div className="mins h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                                {time.minutes} Mins
                            </div>
                            <div className="secs h-28 px-5 rounded bg-primary text-light flex items-center justify-center text-3xl font-semibold p-2 text-center">
                                {time.seconds} Secs
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default React.memo(Counter);
