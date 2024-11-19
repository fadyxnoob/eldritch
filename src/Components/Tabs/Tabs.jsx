import React, { useState } from 'react'
import image from '../../assets/images/Candi3.jpg'
import VS from '../../assets/images/vs.png'
const Tabs = () => {
    const [toggleTab, setToggleTab] = useState(1)

    const handleToggle = (idx) => {
        setToggleTab(idx)
    }
    return (
        <>
            <div className='flex h-12 justify-between items-center boxShadow'>
                <div
                    onClick={() => handleToggle(1)}
                    className={`tabHeader ${toggleTab === 1 ? 'active' : 'text-black'} relative w-1/3 text-xl cursor-pointer h-full flex items-center justify-center`}
                >
                    <h3>Next Matches</h3>
                </div>
                <div
                    onClick={() => handleToggle(2)}
                    className={`tabHeader ${toggleTab === 2 ? 'active' : 'text-black'} relative w-1/3 text-xl cursor-pointer h-full flex items-center justify-center`}
                >
                    <h3>UpComing Matches</h3>
                </div>
                <div
                    onClick={() => handleToggle(3)}
                    className={`tabHeader ${toggleTab === 3 ? 'active' : 'text-black'} relative w-1/3 text-xl cursor-pointer h-full flex items-center justify-center`}
                >
                    <h3>Matches Results</h3>
                </div>
            </div>

            <div>
                <div className={`${toggleTab === 1 ? 'block' : 'hidden'} p-5`}>
                    <div className='flex justify-between items-center my-5'>
                        <div className='flex gap-5 items-center w-1/2 justify-around'>
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-lg mt-2 border border-black'>Baba Op</h4>
                            </div>
                            <img src={VS} alt={VS} className='size-14 object-cover' />
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-lg mt-2 border border-black'>How Brand</h4>
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-1/2 flex-col'>
                            <h5 className='text-xl'>Match Date</h5>
                            <p>07 Nov 2023</p>
                        </div>
                    </div>
                </div>
                <div className={`${toggleTab === 2 ? 'block' : 'hidden'} p-5`}>
                    <div className='flex justify-between items-center my-5'>
                        <div className='flex gap-5 items-center w-1/2 justify-around'>
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-base mt-2 border border-black'>Fady Rajput</h4>
                            </div>
                            <img src={VS} alt={VS} className='size-14 object-cover' />
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-base mt-2 border border-black'>Legend Sam</h4>
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-1/2 flex-col'>
                            <h5 className='text-xl'>Match Date</h5>
                            <p>07 Nov 2023</p>
                        </div>
                    </div>
                </div>
                <div className={`${toggleTab === 3 ? 'block' : 'hidden'} p-5`}>
                    <div className='flex justify-between items-center my-5'>
                        <div className='flex gap-5 items-center w-1/2 justify-around'>
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-lg mt-2 text-green-600 border border-green-600'>Winner</h4>
                            </div>
                            <img src={VS} alt={VS} className='size-14 object-cover' />
                            <div>
                                <img src={image} alt={image} className='size-24 object-cover' />
                                <h4 className='text-center text-lg mt-2 text-red-600 border border-red-600'>Loser</h4>
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-1/2 flex-col'>
                            <h5 className='text-xl'>Match Result</h5>
                            <p>22/25</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabs
