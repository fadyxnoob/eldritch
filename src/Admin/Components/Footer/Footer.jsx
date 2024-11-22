import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const openSidebar = useSelector((state) => state.sidebar.openSidebar)
  return (
    <div className={`fixed bottom-0 ${openSidebar ? 'left-[20%] w-[80%]' : 'w-full left-[0%]'} w-full transition-all duration-500 ease-in-out`}>
      <div className='opacity-100 transition-opacity duration-500 text-center p-1 bg-primary text-light'>
        <p>Copyright © ELDRITCH 2024</p>
      </div>
    </div>
  )
}

export default Footer
