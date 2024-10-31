import React from 'react';
import Categories from './Data.js'
import Products from '../ProductCard/Data.js';
import { NavLink } from 'react-router-dom';

const Category = () => {

    const activeCates = Categories.filter((cate) => cate.status);
    const activeProducts = Products.filter((pro)=> pro.status)


    return (
        <>
            <div className='mt-2 boxShadow'>
                <h3 className='text-2xl border-b-2 px-3'>Categories</h3>
                {
                    activeCates.length > 0 ? (
                        activeCates.map((cate) => {
                            const productCounter = activeProducts.filter((pro) => pro.category === cate.name).length;

                            return productCounter > 0 ? (
                                <div className='flex justify-between items-center h-10 px-3 border-b-2' key={cate.id}>
                                    <NavLink
                                        to={`/category/${cate.name}`}
                                    >
                                        <h4 className='text-primary capitalize'>{cate.name}</h4>
                                    </NavLink>
                                    <span>{productCounter}</span>
                                </div>
                            ) : null; 
                        })
                    ) : (
                        'No Categories Found'
                    )
                }
            </div>
        </>
    );
}

export default Category;
