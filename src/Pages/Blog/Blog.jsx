import React from 'react'
import { PostCard, Category } from '../../'

const Blog = () => {
    return (
        <>
            <div className='banner aboutBG'>
                <h1
                    className='text-5xl text-light font-bold border-b-4 border-primary'
                >
                    OUR BLOG
                </h1>
            </div>

            <div className='my-20 mx-20'>
                <h2 className='text-3xl font-medium'>
                    Our Posts
                </h2>
                <div
                    className="flex flex-wrap items-start justify-center gap-5 mt-20 px-2 md:px-20 productCardContainer"
                >
                    <PostCard />

                </div>
            </div>

            {/* pops and categories */}
            <div className="flex mx-20">
                <div className="w-[70%]">
                </div>
                <div className="w-[30%] pt-8">
                    <Category getType='post' />
                </div>
            </div>
        </>
    )
}

export default React.memo(Blog)
