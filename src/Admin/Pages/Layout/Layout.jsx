import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Container from '../../Components/Container/Container'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useSelector, useDispatch } from 'react-redux';
import { loginAdmin } from '../../../Store/AdminSlice'



const AdminLayout = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { adminData, status } = useSelector((state) => state.admin);

  const someConditionToLogin = !adminData;
  const fetchedAdminData = JSON.parse(localStorage.getItem("adminData"));

  useEffect(() => {
    if (!adminData && someConditionToLogin && fetchedAdminData) {
      dispatch(loginAdmin({ adminData: fetchedAdminData }));
    }
  }, [dispatch, adminData, someConditionToLogin, fetchedAdminData]);

  if (!status) {
    return <div>Please log in to access the admin dashboard</div>;
  }


  useEffect(() => {
    setProgress(30);
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setProgress(70);
    }, 200);

    const finishLoading = setTimeout(() => {
      setProgress(100);
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishLoading);
    };
  }, [location]);

  return (
    <div className="overflow-hidden">
      <LoadingBar
        color="#fff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={2}
      />
      <header>
        <Header />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Container>
          {isLoaded && <Outlet />}
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default React.memo(AdminLayout);
