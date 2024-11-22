import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Header, Footer, Sidebar } from '../../';
import LoadingBar from 'react-top-loading-bar';

const AdminLayout = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

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
      <header>
        <Header />
      </header>

      <LoadingBar
        color="#fff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={2}
      />

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

export default AdminLayout;
