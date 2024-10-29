import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Topbar, Navbar, Footer, CartIcon } from '../../';

const Layout = () => {
    return (
        <main className='overflow-hidden'>
            <Topbar />
            <Navbar />
            <Outlet />
            <footer className='mt-10'>
                <Footer />
            </footer>
            <CartIcon />
        </main>
    );
}

export default Layout;
