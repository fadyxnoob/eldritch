import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgetPassword, Home, Login, SignUp, Layout, Candidate, MyCart, About, Shop, Product, MyProfile, UpdateUserProfile, Contact, Blog, CategoryPage, Post, Schedules} from './index.js';
import './index.css';
import { Provider } from 'react-redux';
import Store from './Store/Store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Schedules />} />
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
