import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';
import Alert from '../../Components/Alert/Alert';

const ProductCard = ({ popular = null }) => {
    
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const userdata = useSelector((state) => state.auth.userdata);
    const cart = useSelector((state) => state.cart.products)
    const [alert, setAlert] = useState(null);
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

    const handleCart = (id, quantity, name, price) => {
        if (!userdata) {
            setAlert({ type: 'warning', message: 'Please login first.' })
            return;
        }
        dispatch(addToCart({
            id, quantity, name, price
        }))

        setAlert({ type: 'success', message: 'Item added to the cart.' });
    }


    if (loading) {
        return <p>Loading....</p>
    }          

    return (
        <>    
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            }
            {products.map((pro) => (
                <div key={pro.$id}
                    className={`w-[90%] h-[500px] mx-auto cursor-pointer relative rounded overflow-hidden shadow-md shadow-black sm:w-[45%] md:w-[28%]`}
                >
                    <div className='size-full'>
                        <img src={images[pro.$id]} alt={pro.name} className='size-full object-cover' />
                    </div>
                    <div className="absolute top-5 right-5 gap-5 flex flex-col">
                        <Link to={`/product/${pro.$id}`}>
                            <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light' title={`View ${pro.name}`}>
                                <MdRemoveRedEye className='w-5 h-5' />
                            </div>
                        </Link>
                        <div
                            className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'
                            title='Add to cart'
                            onClick={() => handleCart(pro.$id, 1, pro.name, pro.price)}
                        >
                            <MdShoppingBag className='w-5 h-5' />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default React.memo(ProductCard);


