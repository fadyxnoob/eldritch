import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard } from '../../index'
import Blog1 from '../../assets/images/blog1.jpg'
import Blog2 from '../../assets/images/blog2.jpg'
import Blog3 from '../../assets/images/blog3.jpg'
import Candidate3 from '../../assets/images/Candi3.jpg'
import Candidate7 from '../../assets/images/Candi7.jpg'
import Candidate9 from '../../assets/images/Candi9.jpg'
import authService from '../../Appwrite/Auth'
import { login, logout } from '../../Store/authSlice'


document.title = 'Byt3Blitz | Home'
const Home = () => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then(
                (userData) => {
                    if (userData) {
                        dispatch(login({ userData }))
                    } else {
                        dispatch(logout())
                    }
                }
            )
            .finally(() => setLoading(false))
    }, [])

    return !loading ?
        (
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

                        <ProductCard limit={3} />
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
        ) : 'Loading'
}

export default Home;

