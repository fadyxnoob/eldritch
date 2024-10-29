import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Topbar, Navbar, Footer } from '../../';

const Layout = () => {
    return (
        <main className='overflow-hidden'>
            <Topbar />
            <Navbar />
            <Outlet />
            <footer className='mt-10'>
                <Footer />
            </footer>
        </main>
    );
}

export default Layout;
