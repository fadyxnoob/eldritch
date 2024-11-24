import React from 'react'
import Button from '../../Components/Button/Button'
const ManageTimer = () => {

    return (
        <div>
            <h1 className="px-2">Manage Event Timer</h1>
            <div className="my-10">
                <form>
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 '
                    >
                        <div className='w-full'>
                            <label htmlFor="Facebook">Heading</label>
                            <input
                                id='Facebook'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Entries Will be Closed'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Days</label>
                            <input
                                id='Instagram'
                                type="number"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={10}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                                min={0}

                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Hours</label>
                            <input
                                id='Instagram'
                                type="number"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={20}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                                min={0}
                                max={24}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Minutes</label>
                            <input
                                id='Instagram'
                                type="number"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={60}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                                min={0}
                                max={60}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Seconds</label>
                            <input
                                id='Instagram'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={23}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                                min={0}
                                max={60}
                            />
                        </div>
                    </div>

                    <Button title={'Update'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageTimer)
