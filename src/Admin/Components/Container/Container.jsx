import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Container = () => {
  const openSidebar = useSelector((state) => state.sidebar.openSidebar);

  return (
    <div
      className={`px-5 relative ${openSidebar ? 'left-[20%] w-[80%]' : 'left-[0%] w-full'} border h-full transition-all duration-500 ease-in-out`}
    >
      <div className="opacity-100 transition-opacity duration-500 p-5">
        
        <h1
          className='text-4xl font-semibold'
        >DASHBOARD</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
