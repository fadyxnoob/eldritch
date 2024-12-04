import React, { useState } from 'react';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import image from '../../../assets/images/shop/product-1/product3.2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from "../../../Store/DashboardSlices/Sidebar";
import { setLocalStorage } from '../../../LocalStorage/LocalStorage';
import adminService from '../../Appwrite/Auth';
import { logoutAdmin } from '../../../Store/AdminSlice.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const openSidebar = useSelector((state) => state.sidebar.openSidebar);
  const navigate = useNavigate();

  const handleOpenCloseSidebar = () => {
    dispatch(toggleSidebar());
    const currentState = !openSidebar;
    setLocalStorage('openSidebar', currentState);
  };

  const logoutHandler = async () => {
    const res = await adminService.adminLogout();
    if (res) {
      localStorage.removeItem('adminLogin')
      localStorage.removeItem('adminData')
      dispatch(logoutAdmin());
      navigate('/admin/adminLogin');
    }
  };

  return (
    <div className='h-16 bg-primary flex items-center justify-between px-5 fixed top-0 w-full z-10'>
      <div className='flex w-[20%] justify-between h-full items-center'>
        <h1 className='text-light text-4xl'>ELDRITCH</h1>
        <div
          className="relative flex items-center justify-center"
          onClick={handleOpenCloseSidebar}
        >
          {!openSidebar ? (
            <FaXmark
              className={`absolute size-8 text-light cursor-pointer transform transition-transform transition-opacity duration-500 opacity-100 scale-100 rotate-0`}
            />
          ) : (
            <FaBarsStaggered
              className={`absolute size-8 text-light cursor-pointer transform transition-transform transition-opacity duration-500 opacity-100 scale-100 rotate-0`}
            />
          )}
        </div>
      </div>

      <div className='flex gap-5 items-center'>
        <div>
          <img src={image} alt="" className='size-16 rounded-full' />
        </div>
        <button
          className='text-light text-xl border px-2'
          onClick={logoutHandler}
        >Logout</button>
      </div>
    </div>
  );
}

export default React.memo(Header);
