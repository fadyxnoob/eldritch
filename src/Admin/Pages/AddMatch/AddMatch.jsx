import React from 'react'
import Button from '../../Components/Button/Button'



const AddMatch = () => {
    return (
        <div>
            <h1 className="px-2">Add Match</h1>
            <div className='boxShadow my-10 p-5'>
                <div className='flex justify-between items-center gap-5 md:flex-row flex-col'>
                    <div className="w-full">
                        <label htmlFor="type">Player 1</label> <br />
                        <select name="" id="type"
                            className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                        >
                            <option value="post" className='h-10 p-2'>Post</option>
                            <option value="product" className='h-10 p-2'>Product</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="type">Player 2</label> <br />
                        <select name="" id="type"
                            className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                        >
                            <option value="post" className='h-10 p-2'>Post</option>
                            <option value="product" className='h-10 p-2'>Product</option>
                        </select>
                    </div>
                </div>
                <Button title={'Add Match'} style={'mt-5 px-5'} />
            </div>
        </div>
    )
}

export default React.memo(AddMatch)
