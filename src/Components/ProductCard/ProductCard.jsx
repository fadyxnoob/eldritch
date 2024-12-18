import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import { Link } from 'react-router-dom';
import { addToCart } from '../../Store/cartSlice';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import Alert from '../../Components/Alert/Alert';
import useGSAPAnimations from '../../Pages/useGSAPAnimations/UseGSAPAnimations';
import gsap from 'gsap';

const ProductCard = ({ popular = null, style = 'sm:w-[45%] md:w-[28%]', limit=null }) => {

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const userdata = useSelector((state) => state.auth.userdata);
    const cart = useSelector((state) => state.cart.products)
    const [alert, setAlert] = useState(null);

    const cardRefs = useRef([]);
    const iconRefs = useRef([]);

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

    useGSAPAnimations(() => {
        if (cardRefs.current.length > 0 && iconRefs.current.length > 0) {
            // Iterate through each card
            cardRefs.current.forEach((card, idx) => {
                const cardTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 50%',
                        toggleActions: 'play none none none',
                    },
                });

                // Animate the card first
                cardTimeline.from(card, {
                    x: idx % 3 === 0 ? -50 : idx % 3 === 1 ? 0 : 50, // Left, center, right movement
                    y: idx % 3 === 1 ? 50 : 0, // Add downward movement for center cards
                    scale: idx % 3 === 1 ? 0.8 : 1, // Scale down only center cards
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                });

                // Then animate the two icons of the current card without using a class
                const icons = iconRefs.current[idx]?.children; // Accessing all child elements of the icon container
                if (icons && icons.length === 2) {
                    cardTimeline.from(icons[0], {
                        opacity: 0,
                        y: -30, // Slide up effect
                        rotation: -45, // Rotate counterclockwise
                        duration: 0.6,
                        ease: "power2.out",
                    });

                    cardTimeline.from(icons[1], {
                        opacity: 0,
                        y: 30, // Slide down effect
                        rotation: 45, // Rotate clockwise
                        duration: 0.6,
                        ease: "power2.out",
                    }, '-=0.4'); // Overlap the animation slightly for a smoother effect
                }
            });
        }
    }, [products]);

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
            {products.slice(0, limit).map((pro, idx) => (
                <div
                    key={pro.$id}
                    ref={(el) => cardRefs.current[idx] = el}
                    className={`w-full h-[400px] md:h-[500px] cursor-pointer relative rounded overflow-hidden shadow-md shadow-black ${style}`}
                >
                    <div className='size-full'>
                        <img src={images[pro.$id]} alt={pro.name} className='size-full object-cover' />
                    </div>
                    <div className="absolute top-5 right-5 gap-5 flex flex-col overflow-hidden"
                        ref={(el) => iconRefs.current[idx] = el}
                    >
                        <Link to={`/product/${pro.$id}`}>
                            <div className='overflow-hidden card_icon_holder w-10 h-10 flex items-center justify-center bg-primary rounded text-light' title={`View ${pro.name}`}>
                                <MdRemoveRedEye className='w-5 h-5 card_icon' />
                                <MdRemoveRedEye className='w-5 h-5 card_icon_copy' />
                            </div>
                        </Link>
                        <div
                            className='overflow-hidden card_icon_holder w-10 h-10 flex items-center justify-center bg-primary rounded text-light'
                            title='Add to cart'
                            onClick={() => handleCart(pro.$id, 1, pro.name, pro.price)}
                        >
                            <MdShoppingBag className='w-5 h-5 card_icon' />
                            <MdShoppingBag className='w-5 h-5 card_icon_copy' />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default React.memo(ProductCard);


