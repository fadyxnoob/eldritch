import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../../Components/Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../../Store/cartSlice'
import { setLocalStorage } from '../../LocalStorage/LocalStorage';



const CheckOut = () => {
    const { checkOutProductID } = useParams();
    const [document, setDocument] = useState({});
    const [proImage, setViewImage] = useState('');
    const [cat, setCat] = useState({});
    const [alert, setAlert] = useState(null);
    const userdata = useSelector((state) => state.auth.userdata);
    const dispatch = useDispatch();
    const orderItem = useSelector((state) => state.order.item);
    const [quantity, setQuantity] = useState(orderItem.quantity);
    const [loading, setLoading] = useState(true);
    const [formData, setFromData] = useState({ email: '', phone: '', postalCode: '', address: '' })
    const navigate = useNavigate();

    // Fetch product data with memoization
    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const product = await authService.getSingleProduct(checkOutProductID);
            if (product) {
                const category = product.cat
                    ? await authService.getCategory(product.cat)
                    : 'Unknown';
                setCat(category || 'Unknown');
                setDocument(product);
                setViewImage(service.ViewImage(product?.image));
            } else {
                console.warn('Product not found.');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        } finally {
            setLoading(false);
        }
    }, [checkOutProductID]);

    useEffect(() => {
        getData();
        if (!userdata) {
            navigate('/login')
        }
    }, [getData, userdata]);

    // Handle form submission
    const submitHandler = useCallback(
        async (e) => {
            e.preventDefault();
            if (!formData.email && !formData.phone && !formData.postalCode && !formData.address) {
                console.error('form empty');
                setAlert({ type: 'warning', message: 'Fill the form' })
                return;
            }
            const user = { userID: userdata.$id, formData }
            const order = { price: orderItem.price, quantity: quantity, proID: checkOutProductID }
            const res = await service.addUserOrder(user, order)
            setFromData({ email: '', phone: '', postalCode: '', address: '' })
            setAlert(res)
            dispatch(removeItem(checkOutProductID))
            setTimeout(() => {
                setLocalStorage('orderItem', '')
                navigate('/myCart')
            }, 1000);
        },
        [formData]
    );

    const handleMinusQuantity = () =>
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

    const handlePlusQuantity = () =>
        setQuantity((prev) => prev + 1);


    if (loading) return <p>Loading...</p>;
    return (
        <>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            }
            <div className="productBG banner px-5 md:px-20 py-1">
                <h1 className='text-light text-lg md:text-2xl capitalize'>
                        You are Odering > {document?.name}
                </h1>
            </div>

            <div className="my-10 md:flex justify-between md:mx-10 md:px-10">
                <div className='p-5 boxShadow md:w-[45%] bg-green-200 h-fit'>
                    <div className="">
                        <img src={proImage} alt={proImage} className='size-full object-cover' />
                    </div>
                    <div className="flex justify-around gap-3 h-20 mt-5 w-full">
                        <img src={proImage} alt={proImage} className='size-full object-fill border' />
                        <img src={proImage} alt={proImage} className='size-full object-fill border' />
                        <img src={proImage} alt={proImage} className='size-full object-fill border' />
                    </div>
                </div>
                <div className="px-10 md:w-[55%] mt-5 md:mt-0">
                    <h2 className='text-4xl font-semibold'>{document.name}</h2>
                    <div className='flex gap-2 mt-5'>
                        <strong>Price :</strong>
                        <p className='text-lg'>${orderItem.price * quantity}</p>
                    </div>
                    <p className='text-sm'>{document.disc}</p>
                    <div className='flex gap-2 mt-5'>
                        <strong>Category :</strong>
                        <p className='capitalize text-lg'>{cat.cat_name}</p>
                    </div>

                    <div className='flex mt-5 bg-primary w-[30%] md:w-1/3 lg:w-[20%] h-8 items-center justify-between rounded'>
                        <button onClick={handleMinusQuantity} >
                            <CiSquareMinus className='size-8 text-light cursor-pointer' />
                        </button>
                        <div className=''>{quantity}</div>
                        <button onClick={handlePlusQuantity}>
                            <CiSquarePlus className='size-8 text-light cursor-pointer' />
                        </button>
                    </div>

                    <div className="mt-10">
                        <h3 className='text-3xl font-medium'>Description</h3>
                        <p className='text-sm'>{document.disc}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 mx-2 px-2 md:mx-10 md:px-10 boxShadow py-5">
                <h3 className='text-4xl font-medium text-center'>Order Now</h3>
                <form
                    onSubmit={submitHandler}
                >
                    <div className='flex justify-between gap-5 flex-col mb-3'>
                        <div className='w-full'>
                            <label htmlFor="email">Email Address</label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFromData((p) => ({ ...p, email: e.target.value }))}
                                id='email'
                                type="email"
                                placeholder='i.e example@example.com'
                                className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 w-full flex-col'>
                        <div className='w-full'>
                            <label htmlFor="phoneNo">Phone No</label>
                            <input
                                value={formData.phone}
                                onChange={(e) => setFromData((p) => ({ ...p, phone: e.target.value }))}
                                id='phoneNo'
                                type="tel"
                                placeholder='i.e +9213587846546'
                                className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                value={formData.postalCode}
                                onChange={(e) => setFromData((p) => ({ ...p, postalCode: e.target.value }))}
                                id='postalCode'
                                type="number"
                                placeholder='i.e 468465'
                                className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="completeAddress">Complete Address </label>
                        <input
                            value={formData.address}
                            onChange={(e) => setFromData((p) => ({ ...p, address: e.target.value }))}
                            id='completeAddress'
                            type="text"
                            placeholder='i.e city xyz, tehsil, dist'
                            className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                    </div>
                    <button
                        type='submit'
                        className='bg-primary w-full mt-5 h-10 text-light text-lg'>Order</button>
                </form>
            </div>
        </>
    );

}

export default CheckOut
