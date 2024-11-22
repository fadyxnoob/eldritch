import React from 'react'
import Player from '../../assets/images/Candi3.jpg'
import { Tabs } from '../../'

const Schedules = () => {
    return (
        <>
         <h1 className='text-center my-5 text-3xl'>Current Playing</h1>
            <div className='mx-5 p-2 flex md:flex-row flex-col items-center justify-around gap-5 my-5 md:w-[60%] md:mx-auto'>
               
                <div className='size-[300px]'>
                    <div className='flex justify-between my-2'>
                        <h2 className='text-center text-2xl m-0 p-0'>Player1</h2>
                        <h3 className='text-center m-0 p-0'>Fyme Baba</h3>
                    </div>
                    <img src={Player} alt={Player} className='size-full object-cover' />
                </div>
                <div className='size-[300px] md:mt-0 mt-10'>
                    <div className='flex justify-between my-2'>
                        <h2 className='text-center text-2xl m-0 p-0'>Player1</h2>
                        <h3 className='text-center m-0 p-0'>CN Spike</h3>
                    </div>
                    <img src={Player} alt={Player} className='size-full object-cover' />
                </div>
            </div>
            <div className="my-20 mx-5 md:w-[90%] md:mx-auto">
                <h4 className='text-center my-5 text-4xl font-semibold'>See Schedules Here</h4>
                <Tabs />
            </div>
        </>
    )
}
export default React.memo(Schedules)
