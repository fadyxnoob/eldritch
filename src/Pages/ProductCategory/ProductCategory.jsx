import React from 'react';
import { useParams } from 'react-router-dom';
import Products from '../../Components/ProductCard/Data';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import { Category } from '../../'
    
const ProductCategory = ({ customWidth = 'w-[40%]' }) => { 
  const productCate = useParams();
  console.log(productCate.categoryName);
  const cateProducts = Products.filter((pro) => pro.category === productCate.categoryName);
  const activeProducts = cateProducts.filter((active) => active.status)
  return (
    <>
      <div className='banner shopBg'>
        <h1 className='text-5xl text-light font-bold border-b-4 border-primary capitalize'>
          Our {productCate.categoryName}
        </h1>
      </div>
      <div className="flex mx-20">
        <div className="w-[70%]">
          <div className="flex flex-wrap gap-5 mt-5 mobile:px-2 mobile:flex-col sm:items-center sm:justify-start productCardContainer">
            {
              activeProducts.length > 0 ? (
                cateProducts.map((pro) => {
                  return (
                    pro.status && <div className={`${customWidth} productCard cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black`} key={pro.id}>
                      <div className='size-full'>
                        <img src={pro.image} alt={pro.image} className='size-full object-cover' />
                      </div>
                      <div className="absolute top-5 right-5 gap-5 flex flex-col">
                        <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                          <MdRemoveRedEye className='w-5 h-5' />
                        </div>
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
            }
          </div>
        </div>
        <div className="w-[30%] pt-8">
          <Category />
        </div>
      </div >
    </>

  )
}

export default ProductCategory;
