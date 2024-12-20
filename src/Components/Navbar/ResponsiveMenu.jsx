import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { MdOutlineSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
// import useGSAPAnimations from '../../Pages/useGSAPAnimations/UseGSAPAnimations';
import { NavbarMenu } from './data';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const ResponsiveMenu = ({ isOpen, setClose }) => {
    const menuItemsRef = useRef([]); 
    const searchInputRef = useRef(null); 

    useEffect(() => {
        if (isOpen) {
            const ctx = gsap.context(() => {
                const timeline = gsap.timeline();
                timeline.from(menuItemsRef.current, {
                    opacity: 0,
                    y: -30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                });

                timeline.from(searchInputRef.current, {
                    opacity: 0,
                    xPercent: -100,
                    duration: 0.8,
                    ease: 'power2.out',
                }, "-=0.4");
            })
            return () => ctx.revert();
        }
    }, [isOpen]);

    return (
        <AnimatePresence mode='wait'>
            {
                isOpen && <motion.div
                    className="fixed top-24 left-0 w-full z-50 md:hidden"
                >
                    <div className='left-0 text-xl font-semibold text-light bg-primary py-10 m-2 rounded-lg h-fit'>
                        <ul className='flex flex-col items-center justify-center gap-5'>
                            {NavbarMenu.map((item, idx) => (
                                <li key={item.id} ref={(el) => (menuItemsRef.current[idx] = el)}>
                                    <Link to={item.link} onClick={setClose}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <div className=' flex items-center justify-center' ref={searchInputRef} >
                                    <div className="searcIcon">
                                        <MdOutlineSearch className='size-5' />
                                    </div>
                                    <div>
                                        <form action="" method="post">
                                            <input type="text" className="placeholder:text-light w-full border-b h-7 px-1 outline-none border-transparent bg-transparent focus:border-light text-base font-normal" placeholder='Type your search' />
                                        </form>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            }
        </AnimatePresence >
    );
}

export default React.memo(ResponsiveMenu);
