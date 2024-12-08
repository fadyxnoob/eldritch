import React, { useEffect, useState } from 'react';
import { FaBagShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const [total, setTotal] = useState(0)
  const cart = useSelector(state => state.cart.products)
  useEffect(() => {
    let total = 0;
    // cart.forEach((pro) => total += pro.quantity)
    // setTotal(total)
    setTotal(cart.length)
  }, [cart])
  return (
    <Link to='/myCart'>
      <div className='bg-primary fixed bottom-12 w-24 left-0 h-12 cartIcon flex items-center justify-end px-5'>
        <div className="relative">
          <FaBagShopping className='text-white h-[40px] w-[40px] font-light' />
          <div
            className={`${!total ? 'text-primary bg-light' : 'text-light bg-primary'} text-sm h-[20px] w-[20px] rounded-full flex items-center justify-center absolute top-[16px] left-[9px]`}
          >
            {total}
          </div>
        </div>
      </div>
    </Link>


  );
}

export default React.memo(CartIcon);
