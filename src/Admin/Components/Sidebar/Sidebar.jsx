import React, { useState, useEffect } from 'react';
import { AiFillDashboard, AiFillFile } from "react-icons/ai";
import { IoLogoPlaystation, IoIosArrowDroprightCircle, IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCartFlatbed, FaBookOpenReader, FaCat } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../../LocalStorage/LocalStorage';
import { toggleSidebar } from "../../../Store/DashboardSlices/Sidebar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const openSidebar = useSelector((state) => state.sidebar.openSidebar)
  const [menuState, setMenuState] = useState({});

  const handleMenuToggle = (menuId) => {
    setMenuState((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      return {
        ...newState,
        [menuId]: !prevState[menuId],
      };
    });
  };

  useEffect(() => {
    const savedState = getLocalStorage('openSidebar');
    if (savedState !== null) {
      dispatch(toggleSidebar(savedState));
    }
  }, [dispatch]);


  return (
    <div className={`h-screen-minus-header ${openSidebar ? 'w-[20%]' : 'w-[0%]'} fixed py-5 bg-black text-light overflow-y-scroll custom-scrollbar transition-all duration-500 ease-in-out `}>
      <div className='opacity-100 transition-opacity duration-500'>
        <h4 className="text-sm px-5">ADMIN</h4>
        <Link to="/admin/dashboard">
          <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
            <AiFillDashboard className="size-6" />
            <h4 className="text-xl">Dashboard</h4>
          </div>
        </Link>

        <div className="mt-5">
          <h4 className="text-sm px-5">INTERFACE</h4>

          {/* Matches Menu */}
          <div className="mt-5">
            <div
              className={`flex justify-between items-center hover:bg-primary px-5 h-8 ${menuState.matches ? "bg-primary" : ""
                }`}
              onClick={() => handleMenuToggle("matches")} // Pass unique ID
            >
              <div className="flex gap-3 items-center">
                <IoLogoPlaystation className="size-6" />
                <h5>Matches</h5>
              </div>
              <div
                className={`transition-transform duration-500 ${menuState.matches ? "rotate-180" : "rotate-0"
                  }`}
              >
                {menuState.matches ? (
                  <IoIosArrowDropdownCircle className="size-6" />
                ) : (
                  <IoIosArrowDroprightCircle className="size-6" />
                )}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${menuState.matches ? "max-h-[500px] p-2" : "max-h-0"
                } bg-primary`}
            >
              <div className="flex flex-col justify-center">
                <h4 className="bg-black px-5 py-2 align-middle">Candidates</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Add Match</h4>
                <h4 className="bg-black px-5 py-2 align-middle">UpComing Matches</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Current Matches</h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  Manage Final Matches
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  Manage Poll Results
                </h4>
              </div>
            </div>
          </div>

          {/* Manage Website Menu */}
          <div className="mt-5">
            <div
              className={`flex justify-between items-center hover:bg-primary px-5 h-8 ${menuState.website ? "bg-primary" : ""
                }`}
              onClick={() => handleMenuToggle("website")} // Pass unique ID
            >
              <div className="flex gap-3 items-center">
                <AiFillFile className="size-6" />
                <h5>Manage Website</h5>
              </div>
              <div
                className={`transition-transform duration-500 ${menuState.website ? "rotate-180" : "rotate-0"
                  }`}
              >
                {menuState.website ? (
                  <IoIosArrowDropdownCircle className="size-6" />
                ) : (
                  <IoIosArrowDroprightCircle className="size-6" />
                )}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${menuState.website ? "max-h-[500px] p-2" : "max-h-0"
                } bg-primary`}
            >
              <div className="flex flex-col justify-center">
                <h4 className="bg-black px-5 py-2 align-middle">Website</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Slider</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Social Media</h4>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div
              className={`flex justify-between items-center hover:bg-primary px-5 h-8 ${menuState.orders ? "bg-primary" : ""
                }`}
              onClick={() => handleMenuToggle("orders")} // Pass unique ID
            >
              <div className="flex gap-3 items-center">
                <FaCartFlatbed className="size-6" />
                <h5>Manage Orders</h5>
              </div>
              <div
                className={`transition-transform duration-500 ${menuState.orders ? "rotate-180" : "rotate-0"
                  }`}
              >
                {menuState.orders ? (
                  <IoIosArrowDropdownCircle className="size-6" />
                ) : (
                  <IoIosArrowDroprightCircle className="size-6" />
                )}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${menuState.orders ? "max-h-[500px] p-2" : "max-h-0"
                } bg-primary`}
            >
              <div className="flex flex-col justify-center">
                <h4 className="bg-black px-5 py-2 align-middle">Pending Orders</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Completed Orders</h4>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div
              className={`flex justify-between items-center hover:bg-primary px-5 h-8 ${menuState.pages ? "bg-primary" : ""
                }`}
              onClick={() => handleMenuToggle("pages")} // Pass unique ID
            >
              <div className="flex gap-3 items-center">
                <FaBookOpenReader className="size-6" />
                <h5>Manage Pages</h5>
              </div>
              <div
                className={`transition-transform duration-500 ${menuState.pages ? "rotate-180" : "rotate-0"
                  }`}
              >
                {menuState.pages ? (
                  <IoIosArrowDropdownCircle className="size-6" />
                ) : (
                  <IoIosArrowDroprightCircle className="size-6" />
                )}
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${menuState.pages ? "max-h-[500px] p-2" : "max-h-0"
                } bg-primary`}
            >
              <div className="flex flex-col justify-center">
                <h4 className="bg-black px-5 py-2 align-middle">About</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Blog</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Contact Us</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Timer</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Faqs</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Privacy Policy</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Shop</h4>
                <h4 className="bg-black px-5 py-2 align-middle">User Guides</h4>
                <h4 className="bg-black px-5 py-2 align-middle">Terms and Conditions</h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm px-5 my-5">COMPONENTS</h4>
            <Link to="/admin/manage-categories">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <FaCat className="size-6" />
                <h4 className="text-lg">Manage Categories</h4>
              </div>
            </Link>
            <h4 className="text-sm px-5 my-5">ACCOUNTS</h4>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">Admin</h4>
              </div>
            </Link>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">Users</h4>
              </div>
            </Link>
            <h4 className="text-sm px-5 my-5">OTHERS</h4>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">Manage Live Stream</h4>
              </div>
            </Link>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">My Team</h4>
              </div>
            </Link>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">Comments</h4>
              </div>
            </Link>
            <Link to="#">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-lg">Reports</h4>
              </div>
            </Link>
          </div>

          <div className={`fixed bottom-0 left-0 bg-primary  ${openSidebar ? 'w-[20%]' : 'w-0'} h-8 flex items-center justify-start pl-5 transition-all duration-500 ease-in-out`}>
            <div className='opacity-100 transition-opacity duration-500'>
              <span>Login as:</span><strong>Yasir</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
