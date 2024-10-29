import React from 'react';
import { Navbar, Topbar, Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard, Footer } from '../../index'
import Product1 from '../../assets/images/product1.jpg'
import Product2 from '../../assets/images/product2.jpg'
import Product3 from '../../assets/images/product3.jpg'
import Blog1 from '../../assets/images/blog1.jpg'
import Blog2 from '../../assets/images/blog2.jpg'
import Blog3 from '../../assets/images/blog3.jpg'
import Candidate3 from '../../assets/images/candi3.jpg'
import Candidate7 from '../../assets/images/candi7.jpg'
import Candidate9 from '../../assets/images/candi9.jpg'
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

                    <ProductCard image={Product1} alt='ProductOne' />
                    <ProductCard image={Product2} alt='ProductTwo' />
                    <ProductCard image={Product3} alt='ProductThree' />
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
                    <PostCard image={Blog1} alt='Blog1' user='yasir' cat='results' day='29' month='Oct' title='Get Ready for Gamming Glory : Announcing the Next Tournament' />
                    <PostCard image={Blog2} alt='Blog2' user='hammad' cat='tournament' day='31' month='Nov' title='Mastering the Battlegrounds : Your Ultimate PUBG Blog' />
                    <PostCard image={Blog3} alt='Blog3' user='yasir' cat='results' day='19' month='Mar' title='Recapping the Thrills and Spills : ELDRITCH S3 Tournament Results Unveiled ' />
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
    );
}

export default Home;

