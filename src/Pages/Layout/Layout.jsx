import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Topbar, Navbar, Footer, CartIcon } from '../../';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, logout } from '../../Store/authSlice';
import authService from '../../Appwrite/Auth';
import LoadingBar from 'react-top-loading-bar';
import { getLocalStorage } from '../../LocalStorage/LocalStorage';

const Layout = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const userdata = useSelector((state) => state.auth.userdata);
    const [progress, setProgress] = useState(0);
    const location = useLocation();


    useEffect(() => {
        setProgress(30);
        const timer = setTimeout(() => {
            setProgress(100);
        }, 500);

        return () => clearTimeout(timer);
    }, [location]);

    useEffect(() => {
        const checkUser = getLocalStorage('authStatus');
        if (checkUser) {
            authService.getCurrentUser()
                .then((userData) => {
                    if (userData) {
                        dispatch(authLogin({ userdata: userData }));
                    } else {
                        dispatch(logout());
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false)
        }

    }, [dispatch]);

    useEffect(() => {
        if (userdata) {
            setUser(userdata);
        } else {
            setUser(null);
        }
    }, [userdata]);

    return !loading ? (
        <main className="overflow-hidden w=[1270px]">
            <LoadingBar
                color="#fff"
                progress={progress}
                onLoaderFinished={() => setProgress(0)} // Reset progress
                height={2}
            />
            <Topbar user={user} />
            <Navbar />
            <Outlet />
            <footer className="mt-10">
                <Footer />
            </footer>
            <CartIcon />
        </main>
    ) : (
        'Loading ......'
    );
};

export default React.memo(Layout);
