import React from 'react';
import { Comments } from '../../'
import { useParams } from 'react-router-dom';
import Products from '../../Components/ProductCard/Data.js'

const Product = () => {
    const {productID} = useParams();
    console.log(Products);
    const product = Products.find((pro) => pro.id === Number(productID))
   
    
    return (
        <>
            <div className="productBG banner px-5 md:px-20 py-1">
                <h1 className='text-light text-lg md:text-2xl capitalize'>
                    Eldritch > Shop > {product.category} > {product.title}
                </h1>
            </div>
            <div className="my-10 md:flex justify-between md:mx-10 md:px-10">
                <div className='p-5 boxShadow md:w-[45%]'>
                    <div className="">
                        <img src={product.image} alt={product.image} className='size-full object-cover' />
                    </div>
                    <div className="flex justify-around gap-3 h-20 mt-5 w-full">
                        <img src={product.image} alt={product.image} className='size-full object-fill border' />
                        <img src={product.image} alt={product.image} className='size-full object-fill border' />
                        <img src={product.image} alt={product.image} className='size-full object-fill border' />
                    </div>
                </div>
                <div className="px-10 md:w-[55%] mt-5 md:mt-0">
                    <h2 className='text-4xl font-semibold'>{product.title}</h2>
                    <div className='flex gap-2 mt-5'>
                        <strong>Price :</strong>
                        <p className='text-lg'>${product.price}</p>
                    </div>
                    <p className='text-sm'>{product.description}</p>
                    <div className='flex gap-2 mt-5'>
                        <strong>Category :</strong>
                        <p className='capitalize text-lg'>{product.category}</p>
                    </div>
                    <div className='text-end md:text-start'>
                        <button className='mt-5 bg-primary px-5 py-2 text-light rounded'>Add To Cart</button>
                    </div>

                    <div className="mt-10">
                        <h3 className='text-3xl font-medium'>Description</h3>
                        <p className='text-sm'>{product.description}</p>
                    </div>
                    <div className="mt-10">
                        <h3 className='text-2xl font-medium'>Add Comment</h3>
                        <p className="text-sm my-5">
                            Your address will not be published..
                        </p>
                        <form method='post'>
                            <label htmlFor="addComment">Write Here</label>   <br />
                            <input type="email" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5' />
                            <div className='text-end md:text-start'>
                                <button className='mt-5 bg-primary px-5 py-2 text-light rounded'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className=' md:mx-10 md:px-10 px-5'>
                <h3 className='text-3xl font-medium mb-2'>Comments</h3>
                <Comments product={product} />
            </div>
        </>
    );
}

export default Product;
