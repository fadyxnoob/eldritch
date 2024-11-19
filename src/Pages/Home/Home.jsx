import React from 'react';
import { Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard } from '../../index'
import Blog1 from '../../assets/images/blog1.jpg'
import Blog2 from '../../assets/images/blog2.jpg'
import Blog3 from '../../assets/images/blog3.jpg'
import Candidate3 from '../../assets/images/Candi3.jpg'
import Candidate7 from '../../assets/images/Candi7.jpg'
import Candidate9 from '../../assets/images/Candi9.jpg'


document.title = 'Byt3Blitz | Home'

const Home = () => {

    return (
        <>
            <Banner />
            <div className='my-20'>
                <h2 className='text-5xl font-medium text-center'>
                    OUR PRODUCTS
                </h2>

                <div className="
                    flex flex-wrap px-20 gap-5 mt-20
                    mobile:px-2 mobile:flex-col
                   sm:items-center sm:justify-center
                   productCardContainer
                    ">

                    <ProductCard customWidth='w-[35%]' />
                </div>
            </div>

            <div className="my-20">
                <LiveStream />
            </div>

            <div className="my-20">
                <Counter />
            </div>

            <div className="my-20">
                <h2 className='text-5xl font-medium text-center'>
                    LATEST BLOGS
                </h2>

                <div className="
                    flex flex-wrap px-20 gap-5 mt-20
                    mobile:px-2 mobile:flex-col
                   sm:items-center sm:justify-center
                   productCardContainer
                    ">
                    <PostCard customWidth='w-[27%]'/>
                </div>
            </div>

            <div className="my-20">
                <h2 className='text-5xl font-medium text-center'>
                    LATEST WINNERS
                </h2>

                <div className="
                    flex flex-wrap px-20 gap-5 mt-20
                    mobile:px-2 mobile:flex-col
                    sm:items-center justify-center
                    productCardContainer
                    ">
                    <WinnerCard image={Candidate3} alt='Final Winner' />
                    <WinnerCard image={Candidate7} alt='Final Winner' />
                    <WinnerCard image={Candidate9} alt='Final Winner' />
                </div>
            </div>
        </>
    )
}
export default Home;

