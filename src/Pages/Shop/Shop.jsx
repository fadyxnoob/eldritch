import React from 'react';
import { ProductCard } from '../../'
import { Category } from '../../'

const Shop = () => {

    return (
        <>
            <div className='banner shopBg'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Our Shop</h1>
            </div>
            <div className='my-20 mx-20'>
                <h2 className='text-3xl font-medium'>
                    OUR PRODUCTS
                </h2>
                <div className="
                    flex flex-wrap  gap-5 mt-5
                    mobile:px-2 mobile:flex-col
                    sm:items-center sm:justify-start
                    productCardContainer
                    ">
                    <ProductCard customWidth='w-[35%]' />
                </div>
            </div>
            {/* Paginations */}

            {/* pops and catrgories */}
            <div className="flex mx-20">
                <div className="w-[70%]">
                    <h2 className='text-3xl font-normal'>Popular Items</h2>
                    <div className="
                    flex flex-wrap  gap-5 mt-5
                    mobile:px-2 mobile:flex-col
                    sm:items-center sm:justify-start
                    productCardContainer
                    ">
                        <ProductCard customWidth='w-[full]' popular='true' />
                    </div>
                </div>
                <div className="w-[30%] pt-8">
                    <Category getType='product' />
                </div>
            </div>
        </>
    );
}

export default Shop;