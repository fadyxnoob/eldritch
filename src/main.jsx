import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store/Store.js';
import './index.css';

// Lazy load components
const ForgetPassword = lazy(() => import('./Pages/ForgetPassword/ForgetPassword.jsx'));
const Home = lazy(() => import('./Pages/Home/Home.jsx'));
const Login = lazy(() => import('./Pages/Login/Login.jsx'));
const SignUp = lazy(() => import('./Pages/SignUp/SignUp.jsx'));
const Layout = lazy(() => import('./Pages/Layout/Layout.jsx'));
const Candidate = lazy(() => import('./Pages/Candidate/Candidate.jsx'));
const MyCart = lazy(() => import('./Pages/MyCart/MyCart.jsx'));
const About = lazy(() => import('./Pages/About/About.jsx'));
const Shop = lazy(() => import('./Pages/Shop/Shop.jsx'));
const Product = lazy(() => import('./Pages/Product/Product.jsx'));
const MyProfile = lazy(() => import('./Pages/MyProfile/MyProfile.jsx'));
const UpdateUserProfile = lazy(() => import('./Pages//UpdateUserProfile/UpdateUserProfile.jsx'));
const Contact = lazy(() => import('./Pages/Contact/Contact.jsx'));
const Blog = lazy(() => import('./Pages/Blog/Blog.jsx'));
const CategoryPage = lazy(() => import('./Components/CategoryPage/CategoryPage.jsx'));
const Post = lazy(() => import('./Pages//Post/Post.jsx'));
const Schedules = lazy(() => import('./Pages/Schedules/Schedules.jsx'));

// Admin components
const AdminLogin = lazy(() => import('./Admin/Pages/Login/Login.jsx'));
const Dashboard = lazy(() => import('./Admin/Pages/Dashboard/Dashboard.jsx'));
const AdminLayout = lazy(() => import('./Admin/Pages/Layout/Layout.jsx'));
const Categories = lazy(() => import('./Admin/Pages/Categories/Categories.jsx'));
const AddCategory = lazy(() => import('./Admin/Pages/AddCategory/AddCategory.jsx'))
const UpdateCategory = lazy(() => import('./Admin/Pages/UpdateCategory/UpdateCategory.jsx'))
const ManageAdmins = lazy(() => import('./Admin/Pages/ManageAdmins/ManageAdmins.jsx'))
const UpdateAdmin = lazy(() => import('./Admin/Pages/UpdateAdmin/UpdateAdmin.jsx'))
const ManageUsers = lazy(() => import('./Admin/Pages/ManageUsers/ManageUsers.jsx'))
const ManageLiveStream = lazy(() => import('./Admin/Pages/ManageLiveStream/ManageLiveStream.jsx'))
const MyTeam = lazy(() => import('./Admin/Pages/MyTeam/MyTeam.jsx'))
const ManageComments = lazy(() => import('./Admin/Pages/ManageComments/ManageComments.jsx'))
const AddAdmin = lazy(() => import('./Admin/Pages/AddAdmin/AddAdmin.jsx'))
const ManageCandidates = lazy(() => import('./Admin/Pages/ManageCandidates/ManageCandidates.jsx'))
const AddMatch = lazy(() => import('./Admin/Pages/AddMatch/AddMatch.jsx'))
const ManageUpcomingMatches = lazy(() => import('./Admin/Pages/ManageUpcomingMatches/ManageUpcomingMatches.jsx'))
const ManageFinalWinner = lazy(() => import('./Admin/Pages/ManageFinalWinner/ManageFinalWinner.jsx'))
const ManageCurrentMatches = lazy(() => import('./Admin/Pages/ManageCurrentMatches/ManageCurrentMatches.jsx'))
const ManagePollMatches = lazy(() => import('./Admin/Pages/ManagePollMatches/ManagePollMatches.jsx'))
const ManageWebsite = lazy(() => import('./Admin/Pages/ManageWebsite/ManageWebsite.jsx'))
const ManageSlider = lazy(() => import('./Admin/Pages/ManageSlider/ManageSlider.jsx'))
const ManageSocialMedia = lazy(() => import('./Admin/Pages/ManageSocialMedia/ManageSocialMedia.jsx'))
const PendingOrders = lazy(() => import('./Admin/Pages/PendingOrders/PendingOrders.jsx'))
const CompleteOrders = lazy(() => import('./Admin/Pages/CompleteOrders/CompleteOrders.jsx'))
const ManageAbout = lazy(() => import('./Admin/Pages/About/About.jsx'))
const ManagePosts = lazy(() => import('./Admin/Pages/ManagePosts/ManagePosts.jsx'))
const ManageContactPage = lazy(() => import('./Admin/Pages/ManageContactPage/ManageContactPage'))
const ManageTimer= lazy(() => import('./Admin/Pages/ManageTimer/ManageTimer.jsx'))
const ManageFaqs= lazy(() => import('./Admin/Pages/ManageFaqs/ManageFaqs.jsx'))
const ManagePolicy= lazy(() => import('./Admin/Pages/ManagePolicy/ManagePolicy.jsx'))
const ManageProducts= lazy(() => import('./Admin/Pages/ManageProducts/ManageProducts.jsx'))
const UserGuide= lazy(() => import('./Admin/Pages/UserGuide/UserGuide.jsx'))
const TermsConditions= lazy(() => import('./Admin/Pages/TermsConditions/TermsConditions.jsx'))


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Suspense fallback={<div>Lazy is Loading...</div>}>
          <Routes>
            {/* Main Site Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="forgetPassword" element={<ForgetPassword />} />
              <Route path="candidate" element={<Candidate />} />
              <Route path="myCart" element={<MyCart />} />
              <Route path="aboutus" element={<About />} />
              <Route path="shop" element={<Shop />} />
              <Route path="myProfile" element={<MyProfile />} />
              <Route path="category/:catID" element={<CategoryPage />} />
              <Route path="product/:productID" element={<Product />} />
              <Route path="post/:postID" element={<Post />} />
              <Route path="update_user" element={<UpdateUserProfile />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="schedules" element={<Schedules />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manage-categories" element={<Categories />} />
              <Route path="addCategory" element={<AddCategory />} />
              <Route path="updateCategory" element={<UpdateCategory />} />
              <Route path="manageAdmins" element={<ManageAdmins />} />
              <Route path="updateAdmin" element={<UpdateAdmin />} />
              <Route path="manageUsers" element={<ManageUsers />} />
              <Route path="manageLiveStream" element={<ManageLiveStream />} />
              <Route path="manageTeam" element={<MyTeam />} />
              <Route path="manageComments" element={<ManageComments />} />
              <Route path="addAdmin" element={<AddAdmin />} />
              <Route path="manageCandidates" element={<ManageCandidates />} />
              <Route path="addMatch" element={<AddMatch />} />
              <Route path="manageUpcomingMatches" element={<ManageUpcomingMatches />} />
              <Route path="manageFinalWinner" element={<ManageFinalWinner />} />
              <Route path="currentMatches" element={<ManageCurrentMatches />} />
              <Route path="pollMatches" element={<ManagePollMatches />} />
              <Route path="manageWebsite" element={<ManageWebsite />} />
              <Route path="manageSlider" element={<ManageSlider />} />
              <Route path="manageSocialMedia" element={<ManageSocialMedia />} />
              <Route path="pendingOrders" element={<PendingOrders />} />
              <Route path="completedOrders" element={<CompleteOrders />} />
              <Route path="completedOrders" element={<CompleteOrders />} />
              <Route path="manageAbout" element={<ManageAbout />} />
              <Route path="managePosts" element={<ManagePosts />} />
              <Route path="manageContactPage" element={<ManageContactPage />} />
              <Route path="manageTimer" element={<ManageTimer />} />
              <Route path="manageFaqs" element={<ManageFaqs />} />
              <Route path="managePolicy" element={<ManagePolicy />} />
              <Route path="manageProducts" element={<ManageProducts />} />
              <Route path="userGuide" element={<UserGuide />} />
              <Route path="termsConditions" element={<TermsConditions />} />

            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
