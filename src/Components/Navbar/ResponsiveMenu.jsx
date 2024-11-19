import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
const ResponsiveMenu = ({ isOpen }) => {
    return (
        <AnimatePresence mode='wait'>
            {
                isOpen && <motion.dev
                    initial={{ opecity: 0, y: -100 }}
                    animate={{ opecity: 0, y: 0 }}
                    exit={{ opecity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-0 w-full z-20 lg:hidden"
                >
                    <div className='text-xl font-semibold text-light bg-primary py-10 m-2 rounded-lg h-fit'>
                        <ul className='flex flex-col items-center justify-center gap-5'>
                            <Link to={'/'}>
                                <li>Home</li>
                            </Link>
                            <Link to={'/aboutus'}>
                                <li>About</li>
                            </Link>
                            <Link to='/shedules'>
                                <li>Matches</li>
                            </Link>
                            <Link to={'/shope'}>
                                <li>Shop</li>
                            </Link>
                            <Link to='/blog'>
                                <li>Blog</li>
                            </Link>
                            <Link to='/contact'>
                                <li>Contact</li>
                            </Link>
                            <li>
                                <div className=' flex items-center justify-center'>
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
                </motion.dev>
            }
        </AnimatePresence>
    );
}

export default ResponsiveMenu;
