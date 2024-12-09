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

            <div className='my-20 md:mx-20 px-5'>
                <h2 className='text-3xl font-medium text-center sm:text-start'>
                    Our Posts
                </h2>
                <div
                    className="flex flex-wrap items-start justify-center gap-5 md:mt-20 mt-5  px-2 md:px-20 productCardContainer"
                >
                    <PostCard />

                </div>
            </div>

            {/* pops and categories */}
            <div className="flex mx-5 sm:mx-20">
                <div className="sm:w-[70%]">
                </div>
                <div className="w-full sm:w-[30%] pt-8">
                    <Category getType='post' />
                </div>
            </div>
        </>
    )
}

export default React.memo(Blog)
