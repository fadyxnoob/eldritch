import React, {useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Topbar, Navbar, Footer, CartIcon } from '../../';
import { useDispatch } from 'react-redux';
import {authLogin} from '../../Store/authSlice'

const Layout = () => {
    localStorage.clear();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('authStatus');
        if (storedAuthStatus === 'true') {
            dispatch(authLogin()); 
        }
    }, [dispatch]);

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
