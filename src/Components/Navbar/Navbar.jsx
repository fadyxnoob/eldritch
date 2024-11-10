import React, { useState } from 'react';
import { NavbarMenu } from './data';
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav className='h-16 w-full border px-2 lg:px-20 bg-light flex items-center justify-between'>
                
                {/* LOGO section */}
                <div className="logo flex justify-center items-center">
                    <Link to='/'>
                    <h1 className='text-4xl text-black font-medium'>ELDRITCH</h1>
                    </Link>
                </div>

                {/* Menu section */}
                <div className="hidden lg:block navItems">
                    <ul className='flex items-center gap-6'>
                        {
                            NavbarMenu.map((item) => {
                                return (
                                    <li key={item.id}>
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
                <div className='hidden lg:flex items-center justify-center'>
                    <div className="searcIcon">
                        <MdOutlineSearch  className='size-5'/>
                    </div>
                    <div>
                        <form>
                        <input type="text" className="w-fit border-b h-7 px-1 outline-none border-transparent focus:border-primary" placeholder='Type your search'/>
                        </form>
                    </div>
                </div>
                {/* Mobile Humburger menue*/}
                <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <MdMenu  className='text-4xl cursor-pointer'/>
                </div>
            </nav>
            <ResponsiveMenu isOpen={isOpen} />
        </>
    );
}

export default Navbar;
