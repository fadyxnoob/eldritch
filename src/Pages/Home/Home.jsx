import React from 'react';
import { Navbar, Topbar, Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard, Footer } from '../../index'

const Home = () => {
    return (
        <main className='overflow-hidden'>
            <Topbar />
            <Navbar />
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

                    <ProductCard image='src/assets/images/product1.jpg' alt='ProductOne'   />
                    <ProductCard image='src/assets/images/product2.jpg' alt='ProductTwo'   />
                    <ProductCard image='src/assets/images/product3.jpg' alt='ProductThree' />
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
                    <PostCard image='src/assets/images/blog1.jpg' alt='Blog1' user='yasir' cat='results' day='29' month='Oct' title='Get Ready for Gamming Glory : Announcing the Next Tournament' />
                    <PostCard image='src/assets/images/blog2.jpg' alt='Blog2' user='hammad' cat='tournament' day='31' month='Nov' title='Mastering the Battlegrounds : Your Ultimate PUBG Blog' />
                    <PostCard image='src/assets/images/blog3.jpg' alt='Blog3' user='yasir' cat='results' day='19' month='Mar' title='Recapping the Thrills and Spills : ELDRITCH S3 Tournament Results Unveiled ' />
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
                    <WinnerCard image='src/assets/images/candi3.jpg' alt='Final Winner' />
                    <WinnerCard image='src/assets/images/candi7.jpg' alt='Final Winner' />
                    <WinnerCard image='src/assets/images/candi9.jpg' alt='Final Winner' />
                </div>

            </div>
            <footer className='mt-10'>
                <Footer />
            </footer>
        </main>
    );
}

export default Home;

