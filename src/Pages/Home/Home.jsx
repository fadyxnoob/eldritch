import React from 'react';
import { Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard } from '../../index'
import Candidate3 from '../../assets/images/Candi3.jpg'
import Candidate7 from '../../assets/images/Candi7.jpg'
import Candidate9 from '../../assets/images/Candi9.jpg'


document.title = 'Byt3Blitz | Home'

const Home = () => {

    return (
        <>
            <Banner />
            <div className='my-20'>
                <h3 className='text-5xl font-medium text-center'>Our Products</h3>
                <div className="flex flex-wrap items-start justify-start gap-5 mt-20 px-2 md:px-20 productCardContainer">
                    <ProductCard />
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
                    Latest Blogs
                </h2>
                <div
                    className="flex flex-wrap items-start justify-center gap-5 mt-20 px-2 md:px-20 productCardContainer mx-auto"
                >
                    <PostCard />
                </div>
            </div>

            <div className="my-20">
                <h2
                    className='text-5xl font-medium text-center'>
                    Latest Winners
                </h2>
                <div
                    className="flex items-center justify-center gap-5 mt-20 mx-auto px-2 flex-col sm:flex-row"
                >
                    <WinnerCard image={Candidate3} alt='Final Winner' />
                    <WinnerCard image={Candidate7} alt='Final Winner' />
                    <WinnerCard image={Candidate9} alt='Final Winner' />
                </div>
            </div>
        </>
    )
}
export default React.memo(Home);

