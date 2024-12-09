import React, { useState } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeItem } from '../../Store/cartSlice';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Alert from "../../Components/Alert/Alert";

const MyCart = () => {
    const [alert, setAlert] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    document.title = 'Byt3Blitz | MyCart'

    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setPhone('')
        setPostalCode('')
        setAddress('')
    }

    const handleMinusQuantity = (id, quantity) => {
        dispatch(changeQuantity({
            id: id,
            quantity: quantity - 1
        }))
    }

    const handlePlusQuantity = (id, quantity) => {
        dispatch(changeQuantity({
            id: id,
            quantity: quantity + 1
        }))
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItem({ id }))
        setAlert({type:'info', message:'Item removed from the cart.'})

    }

    // Calculate total items, total quantity, and total price
    const totalItems = products.length;
    const totalQuantity = products.reduce((sum, pro) => sum + pro.quantity, 0);
    const totalPrice = products.reduce((sum, pro) => sum + (pro.price * pro.quantity), 0);


    return (
        <div className='mt-10'>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <table className='rounded boxShadow w-[70%] border mx-auto'>
                <thead>
                    <tr>
                        <th colSpan={6}>
                            <h1 className='p-0 m-0 bg-primary text-light text-center text-2xl py-2'>My Cart</h1>
                        </th>
                    </tr>
                    <tr>
                        <th className='border p-2 font-light'>#</th>
                        <th className='border p-2 font-light'>Product</th>
                        <th className='border p-2 font-light'>Price</th>
                        <th className='border p-2 font-light'>Quantity</th>
                        <th className='border p-2 font-light'>Total</th>
                        <th className='border p-2 font-light'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((pro, index) => {
                            return (<tr key={pro.id}>
                                <td className='text-center border font-light'>{index + 1}</td>
                                <td className='text-center border font-light'>{pro.name}</td>
                                <td className='text-center border font-light'>${pro.price}</td>
                                <td className='text-center border font-light'>
                                    <div className='flex  h-6 items-center justify-between'>
                                        <button onClick={() => handleMinusQuantity(pro.id, pro.quantity)} >
                                            <CiSquareMinus className='size-7 text-primary cursor-pointer' />
                                        </button>
                                        <div className=''>{pro.quantity}</div>
                                        <button onClick={() => handlePlusQuantity(pro.id, pro.quantity)}>
                                            <CiSquarePlus className='size-7 text-primary cursor-pointer' />
                                        </button>
                                    </div>
                                </td>

                                <td className='text-center border font-light'>${pro.quantity * pro.price}</td>
                                <td className='text-center border font-light'>
                                    <button
                                        onClick={() => handleRemoveItem(pro.id)}
                                    >
                                        <CiCircleRemove className='text-primary size-8 mx-auto cursor-pointer' />
                                    </button>
                                </td>
                            </tr>)
                        })
                    }

                </tbody>
                <tfoot>
                    <tr className='bg-primary text-light'>
                        <td className='text-center border p-2 font-light'>Total Products</td>
                        <td className='text-center border p-2 font-light'>{totalItems}</td>
                        <td className='text-center border p-2 font-light'>Total Items</td>
                        <td className='text-center border p-2 font-light'>{totalQuantity}</td>
                        <td className='text-center border p-2 font-light'>Total Price</td>
                        <td className='text-center border p-2 font-light'>${totalPrice}</td>
                    </tr>
                </tfoot>
            </table>

            <div className="mt-20 w-[80%] mx-auto">
                <h2 className='text-center text-4xl'>Order Now</h2>
                <div className='p-5 boxShadow mt-5'>
                    <form method='POST'>
                        <div className='flex justify-between gap-5'>
                            <div className='w-1/2'>
                                <label htmlFor="name">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id='name' type="text" placeholder='Enter name' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id='email' type="email" placeholder='i.e example@example.com' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                        </div>
                        <div className='flex justify-between gap-5 mt-5'>
                            <div className='w-1/2'>
                                <label htmlFor="phoneNo">Phone No</label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id='phoneNo' type="text" placeholder='i.e +9213587846546' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="postalCode">Postal Code</label>
                                <input
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    id='postalCode' type="email" placeholder='i.e 468465' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="completeAddress">Complete Address </label>
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                id='completeAddress' type="email" placeholder='i.e city xyz, tehsil, dist' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                        </div>
                        <button
                            onClick={(e) => submitHandler(e)}
                            className='bg-primary w-full mt-5 h-10 text-light text-lg'>Purchase</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MyCart);
