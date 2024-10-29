import React, {useState} from 'react';

const MyCart = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    document.title = 'Byt3Blitz | MyCart'

    const submitHandler = (e) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setPhone('')
        setPostalCode('')
        setAddress('')
    }

    return (
        <div className='mt-10'>
            <table className='rounded boxShadow w-[70%] border mx-auto'>

                <thead>
                    <tr>
                        <th colSpan={6}>
                            <h1 className='p-0 m-0 bg-primary text-light text-center text-2xl py-2'>My Cart</h1>
                        </th>
                    </tr>
                    <tr>
                        <th className='border p-2 font-light'>#</th>
                        <th className='border p-2 font-light'>P Name</th>
                        <th className='border p-2 font-light'>P Price</th>
                        <th className='border p-2 font-light'>Quantity</th>
                        <th className='border p-2 font-light'>Total</th>
                        <th className='border p-2 font-light'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-center border p-2 font-light'>1</td>
                        <td className='text-center border p-2 font-light'>Mobile</td>
                        <td className='text-center border p-2 font-light'>$200</td>
                        <td className='text-center border p-2 font-light'>1</td>
                        <td className='text-center border p-2 font-light'>$200</td>
                        <td className='text-center border p-2 font-light'>More</td>
                    </tr>
                </tbody>
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
                                onChange={(e)=>setName(e.target.value)}
                                id='name' type="text" placeholder='Enter name' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="email">Email Address</label>
                                <input 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                id='email' type="email" placeholder='i.e example@example.com' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                        </div>
                        <div className='flex justify-between gap-5 mt-5'>
                            <div className='w-1/2'>
                                <label htmlFor="phoneNo">Phone No</label>
                                <input
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                id='phoneNo' type="text" placeholder='i.e +9213587846546' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="postalCode">Postal Code</label>
                                <input 
                                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value)}
                                id='postalCode' type="email" placeholder='i.e 468465' className='outline-none focus:border-b-2 border-primary w-full bg-[#e8f0fe] h-10 px-2' />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="completeAddress">Complete Address </label>
                            <input
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
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

export default MyCart;
