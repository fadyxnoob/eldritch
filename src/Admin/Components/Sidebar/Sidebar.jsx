import React, { useState, useEffect } from 'react';
import { AiFillDashboard, AiFillFile } from "react-icons/ai";
import { IoLogoPlaystation, IoIosArrowDroprightCircle, IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCartFlatbed, FaBookOpenReader, FaCat } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../../LocalStorage/LocalStorage';
import { toggleSidebar } from "../../../Store/DashboardSlices/Sidebar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const openSidebar = useSelector((state) => state.sidebar.openSidebar)
  const [menuState, setMenuState] = useState({});
  const adminData = useSelector((state) => state.admin.adminData);
  const adminName = adminData?.name || 'Guest';

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
    <div className={`h-screen-minus-header ${openSidebar ? 'w-[20%]' : 'w-[0%]'} fixed py-10 bg-black text-light overflow-y-scroll custom-scrollbar transition-all duration-500 ease-in-out mt-10`}>
      <div className='opacity-100 transition-opacity duration-500'>
        <h4 className="text-lg px-5">ADMIN</h4>
        <NavLink to="/admin/dashboard">
          <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
            <AiFillDashboard className="size-6" />
            <h4 className="text-base">Dashboard</h4>
          </div>
        </NavLink >

        <div className="mt-5">
          <h4 className="text-lg px-5">INTERFACE</h4>

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
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageCandidates'}>
                    Candidates
                  </NavLink  >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/AddMatch'}>
                    Add Match
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/currentMatches'}>
                    Current Matches
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageUpcomingMatches'}>
                    UpComing Matches
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/pollMatches'}>
                    Manage Poll Results
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageFinalWinner'}>
                    Manage Final Matches
                  </NavLink >
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
                <h5>
                  Manage Website
                </h5>
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
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageWebsite'}>
                    Website
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageSlider'}>
                    Slider
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageSocialMedia'}>
                    Social Media
                  </NavLink >
                </h4>
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
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/pendingOrders'}>
                    Pending Orders
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/completedOrders'}>
                    Completed Orders
                  </NavLink >
                </h4>
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
                <h4 className="bg-black px-5 py-2 align-middle"> <NavLink to={'/admin/manageAbout'}>About</NavLink ></h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/managePosts'}>
                    Manage Posts
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageContactPage'}>
                    Contact Us
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageTimer'}>
                    Manage Timer
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageFaqs'}>
                    Manage Faqs
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/managePolicy'}>
                    Privacy Policy
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/manageProducts'}>
                    Manage Products
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/userGuide'}>
                    User Guides
                  </NavLink >
                </h4>
                <h4 className="bg-black px-5 py-2 align-middle">
                  <NavLink to={'/admin/termsConditions'}>
                    Terms and Conditions
                  </NavLink >
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg px-5 my-5">COMPONENTS</h4>

            <NavLink to="/admin/manage-categories">
              <div className="flex items-center mt-5 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <FaCat className="size-6" />
                <h4 className="text-base">Manage Categories</h4>
              </div>
            </NavLink >
            <h4 className="text-lg px-5 my-5">ACCOUNTS</h4>

            <NavLink to="/admin/manageAdmins">
              <div className="flex items-center mt-2 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">Admin</h4>
              </div>
            </NavLink >

            <NavLink to="/admin/manageUsers">
              <div className="flex items-center mt-1 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">Users</h4>
              </div>
            </NavLink >
            <h4 className="text-lg px-5 my-5">OTHERS</h4>

            <NavLink to="/admin/manageLiveStream">
              <div className="flex items-center mt-1 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">Manage Live Stream</h4>
              </div>
            </NavLink >

            <NavLink to="/admin/manageTeam">
              <div className="flex items-center mt-1 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">My Team</h4>
              </div>
            </NavLink >

            <NavLink to="/admin/manageComments">
              <div className="flex items-center mt-1 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">Comments</h4>
              </div>
            </NavLink >

            <NavLink to="#">
              <div className="flex items-center mt-1 gap-2 hover:bg-primary px-5 h-8 transition-all">
                <h4 className="text-base">Reports</h4>
              </div>
            </NavLink >
          </div>

          <div className={`fixed bottom-0 left-0 bg-primary  ${openSidebar ? 'w-[20%]' : 'w-0'} h-8 flex items-center justify-start pl-5 transition-all duration-500 ease-in-out`}>
            <div className='opacity-100 transition-opacity duration-500'>
              <span>Login as:</span><strong>{adminName}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
