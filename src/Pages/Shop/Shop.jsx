import React from 'react';
import { ProductCard } from '../../'
import { Category } from '../../'

const Shop = () => {

    return (
        <>
            <div className='banner shopBg'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Our Shop</h1>
            </div>
            <div className='my-20 sm:px-10'>
                <h3 className='text-5xl font-medium text-center mx-0 md:text-left sm:mx-20'>Our Products</h3>
                <div className="flex flex-wrap items-start justify-start gap-5 mt-20 px-2 md:px-20 productCardContainer">
                    <ProductCard />
                </div>
            </div>
            {/* Paginations */}

            {/* pops and catrgories */}
            <div className="flex flex-col sm:flex-row mx-2 sm:mx-20">
                <div className="w-full sm:w-[70%]">
                    <h2 className='text-3xl font-normal text-center sm:text-start'>Popular Items</h2>
                    <div className="flex flex-wrap items-start justify-start gap-5 productCardContainer">
                        <ProductCard popular={'true'} style={'sm:w-[45%] md:w-[45%] mt-5'}/>
                    </div>
                </div>
                <div className="w-full sm:w-[30%] pt-8">
                    <Category getType='product' setType='pro' />
                </div>
            </div>
        </>
    );
}

export default React.memo(Shop);