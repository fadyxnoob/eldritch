import React, { useState } from 'react';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import Products from './Data.js'
import { Link } from 'react-router-dom';

const ProductCard = ({ customWidth = 'w-[27%]', filterby = 'status', limit = 10 }) => {

    const activeProducts = Products.filter((pro) => pro[filterby]).slice(0, limit);

    return (
        activeProducts.length > 0 ? (
            activeProducts.map((pro) => {
                return (
                    pro.status && <div className={`${customWidth} productCard cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black`} key={pro.id}>
                        <div className='size-full'>
                            <img src={pro.image} alt={pro.image} className='size-full object-cover' />
                        </div>
                        <div className="absolute top-5 right-5 gap-5 flex flex-col">
                            <Link to={`/product/${pro.id}`}>
                                <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                                    <MdRemoveRedEye className='w-5 h-5' />
                                </div>
                            </Link>
                            <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                                <MdShoppingBag className='w-5 h-5' />
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <p className="text-center w-full text-gray-500">No Product Found</p>
        )
    );
}

export default ProductCard;


