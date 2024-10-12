import React from 'react';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";

const ProductCard = ({ image, alt }) => {
    return (
        <div className='productCard cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black'>
            <div className='size-full'>
                <img src={image} alt={alt} className='size-full object-cover'/>
            </div>
            <div className="absolute top-5 right-5 gap-5 flex flex-col">
                <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                    <MdRemoveRedEye className='w-5 h-5'/>
                </div>
                <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                    <MdShoppingBag className='w-5 h-5'/>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;


