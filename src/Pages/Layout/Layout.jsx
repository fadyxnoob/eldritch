import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Topbar, Navbar, Footer, CartIcon } from '../../';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../Store/authSlice'
import authService from '../../Appwrite/Auth';

const Layout = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const userdata = useSelector((state) => state.auth.userdata);


    useEffect(() => {
        if (userdata) {
            setUser(userdata);
        }else{
            setUser(null)
        }
    }, [userdata]);

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(authLogin({ userdata: userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
           
    }, [dispatch])

    
    return !loading ?
        (
            <main className='overflow-hidden'>
                <Topbar user={user} />
                <Navbar />
                <Outlet />
                <footer className='mt-10'>
                    <Footer />
                </footer>
                <CartIcon />
            </main>
        ) : 'Loading ......'
}


export default Layout;
