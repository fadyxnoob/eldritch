import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';

const ProductCard = ({ customWidth = 'w-[27%]', popular = null }) => {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchProducts = () => {
        authService.getAllProducts()
            .then((data) => {
                if (data && data.documents.length > 0) {
                    let fetchedProducts = data.documents;

                    if (popular === "true") {
                        fetchedProducts = fetchedProducts.filter((pro) => pro.popular === "true");
                    }

                    setProducts(fetchedProducts);

                    fetchedProducts.forEach((pro) => {
                        const imageUrl = service.ViewImage(pro.image)
                        setImages(prevImages => ({ ...prevImages, [pro.$id]: imageUrl }));
                        setLoading(false)
                    });
                }
            })
            .catch((error) => {
                console.log('Error fetching products:', error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [popular]);


    if(loading){
        return <p>Loading....</p>
    }
    return (
        <div className="flex flex-wrap gap-4">
            {products.map((pro) => (
                <div key={pro.$id}
                 className={`${customWidth} h-[500px] cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black`}
                 >
                    <div className='size-full'>
                        <img src={images[pro.$id]} alt={pro.name} className='size-full object-cover' />
                    </div>
                    <div className="absolute top-5 right-5 gap-5 flex flex-col">
                        <Link to={`/product/${pro.$id}`}>
                            <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                                <MdRemoveRedEye className='w-5 h-5' />
                            </div>
                        </Link>
                        <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                            <MdShoppingBag className='w-5 h-5' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(ProductCard);


