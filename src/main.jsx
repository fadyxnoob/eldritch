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
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
