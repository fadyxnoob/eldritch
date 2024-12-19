import React, { useEffect, useState, useRef } from 'react';
import { NavbarMenu } from './data';
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
import ResponsiveMenu from './ResponsiveMenu';
// import useGSAPAnimations from '../../Pages/useGSAPAnimations/UseGSAPAnimations';
import gsap from 'gsap'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hamburgerRef = useRef(null);
    const logoRef = useRef(null);
    const menuItemsRef = useRef([]);
    const searchRef = useRef(null);

    // Use the custom GSAP hook
    useEffect(() => {
        const ctx = gsap.context(()=> {
        const navTimeLine = gsap.timeline()
        navTimeLine.from(logoRef.current, {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: 'power2.out',
        });

        navTimeLine.from(menuItemsRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.2,
            stagger: 0.1,
            ease: 'power2.out',
        });

        navTimeLine.from(searchRef.current, {
            opacity: 0,
            x: 100,
            duration: 1,
            ease: 'power2.out',
        });

        navTimeLine.from(hamburgerRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            rotate: 180,
            ease: 'elastic.out(1, 0.3)',
        });
        });

        return () => ctx.revert(); 
    }, []);


    // Function to close the menu
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-3 left-0 mt-5 h-16 w-full border px-2 lg:px-20 bg-light flex items-center justify-between z-50`}
            >
                {/* LOGO section */}
                <div className="logo flex justify-center items-center" ref={logoRef}>
                    <Link to='/'>
                        <h1 className='text-4xl text-black font-medium'>ELDRITCH</h1>
                    </Link>
                </div>

                {/* Menu section */}
                <div className="hidden md:block navItems">
                    <ul className='flex items-center gap-6'>
                        {
                            NavbarMenu.map((item, index) => {
                                return (
                                    <li key={item.id} ref={(el) => (menuItemsRef.current[index] = el)}>
                                        <Link to={item.link}
                                            className='navCustomStyle inline-block text-primary text-lg font-medium'
                                        >{item.title}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* Search input */}
                <div className='hidden md:flex items-center justify-center' ref={searchRef}>
                    <div className="searcIcon">
                        <MdOutlineSearch className='size-5' />
                    </div>
                    <div>
                        <form>
                            <input type="text" className="w-fit border-b h-7 px-1 outline-none border-transparent focus:border-primary" placeholder='Type your search' />
                        </form>
                    </div>
                </div>

                {/* Mobile Hamburger menu */}
                <div className="md:hidden" ref={hamburgerRef} onClick={() => setIsOpen(!isOpen)}>
                    <MdMenu className='text-4xl cursor-pointer' />
                </div>
            </nav>

            {/* Responsive menu */}
            <ResponsiveMenu isOpen={isOpen} setClose={handleClose} />
        </>
    );
}

export default React.memo(Navbar);
