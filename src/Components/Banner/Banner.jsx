import gsap from 'gsap'
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import useGSAPAnimations from '../../Pages/useGSAPAnimations/UseGSAPAnimations';
import backgroundImage from '../../assets/images/carousel.jpg'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Banner = () => {
    const bannerImageRef = useRef()
    const bannerTitleRef = useRef()
    const bannerButtonRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline()
            timeline.from(bannerImageRef.current, {
                opacity: 0,
                duration: 0.6,
                delay: 0.1,
                ease: "power2.out"
            });
            timeline.from(bannerTitleRef.current, {
                opacity: 0,
                y: -150,
                duration: 0.6,
                delay: 0.1,
                scale: 0.2,
                ease: "power2.out",
            })
            timeline.from(bannerButtonRef.current, {
                opacity: 0,
                y: 200,
                duration: 0.6,
                delay: 0.1,
            })
        })
        return () => ctx.revert();
    }, [])

    return (
        <div className='bg-hero p-5 flex items-center justify-end flex-col relative overflow-hidden mt-10' >
            <div ref={bannerImageRef} className="background-container"></div>
            <div className='absolute bottom-40'>
                <div ref={bannerTitleRef} className='text-center text-light font-bold text-5xl'>
                    Join Our New Tournament
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <Link to="/candidate">
                        <button
                            ref={bannerButtonRef}
                            className='bg-primary rounded text-light text-xl h-12 w-44 flex items-center justify-center'>
                            Join Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Banner);
