import React from 'react'
import Button from '../../Components/Button/Button'
const ManageSocialMedia = () => {
    return (
        <div>
            <h1 className="px-2">Manage Social Media</h1>
            <div className="my-10">
                <form>
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 '
                    >
                        <div className='w-full'>
                            <label htmlFor="Facebook">Facebook</label>
                            <input
                                id='Facebook'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Instagram</label>
                            <input
                                id='Instagram'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 mt-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="Linkedin">Linkedin</label>
                            <input
                                id='Linkedin'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Twitter">Twitter</label>
                            <input
                                id='Twitter'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button title={'Update'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageSocialMedia)
