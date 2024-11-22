import React from 'react';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
const CartIcon = () => {
    return (
      <Link to='/myCart'>
      <div className='bg-primary fixed bottom-12 w-24 left-0 h-12 cartIcon flex items-center justify-end px-5'>
            <LiaShoppingBagSolid className='text-white text-4xl font-light-' />
            <div className="cartCounter">
               1
            </div>
        </div>
      </Link>
        

    );
}

export default React.memo(CartIcon);
