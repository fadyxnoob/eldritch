import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductCategory, PostCategory } from '../..';

const CategoryPage = () => {
    const { catID } = useParams();
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search); 
    const categoryType = queryParams.get('type'); 

    return (
        <>
            {categoryType === 'post' ? (
                <PostCategory id={catID} /> 
            ) : categoryType === 'product' ? (
                <ProductCategory id={catID} />  
            ) : (
                <div>Invalid category type!</div>  
            )}
        </>
    );
};

export default CategoryPage;
