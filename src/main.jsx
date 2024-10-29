import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForgetPassword, Home, Login, SignUp, Layout, Candidate, MyCart } from './index.js'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='forgetPassword' element={<ForgetPassword />} />
          <Route path='candidate' element={<Candidate />} />
          <Route path='myCart' element={<MyCart />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
