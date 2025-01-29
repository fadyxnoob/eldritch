import React, { useEffect, useRef } from 'react';
import gsap from 'gsap'
import { Banner, ProductCard, LiveStream, Counter, PostCard, WinnerCard } from '../../index'
import Candidate3 from '../../assets/images/Candi3.jpg'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



const Home = () => {
    document.title = 'Eldritch | Home'

    const proHeadingRef = useRef(null);
    const blogHeadingRef = useRef(null);
    const winnersHeadingRef = useRef(null);
    const headingRefs = [proHeadingRef, blogHeadingRef, winnersHeadingRef];

    useEffect(() => {
        const ctx = gsap.context(() => {
            headingRefs.forEach((ref) => {
                if (ref.current) {
                    gsap.from(ref.current, {
                        scrollTrigger: {
                            trigger: ref.current,
                            start: 'top 50%',
                            end: 'bottom top',
                            toggleActions: 'play none none none',
                        },
                        opacity: 0,
                        y: -150,
                        duration: 0.6,
                        delay: 0.1,
                        scale: 0.2,
                        ease: "power2.out", // Add smooth easing
                    });
                }
            });
        });
        return () => ctx.revert();
    }, []);


    return (
        <>
            <Banner />

            <div className='my-20' id='productsAnime'>
                <h3 ref={proHeadingRef} className='text-5xl font-medium text-center'>Our Products</h3>
                <div className="flex flex-wrap items-start justify-between gap-10 mt-20 px-2 md:px-20 productCardContainer">
                    <ProductCard limit={3} />
                </div>
            </div>

            <div className="my-20 overflow-hidden">
                <LiveStream />
            </div>

            <div className="my-20">
                <Counter />
            </div>

            <div className="my-20">
                <h2 ref={blogHeadingRef} className='text-5xl font-medium text-center'>
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
                    className='text-5xl font-medium text-center'
                    ref={winnersHeadingRef}
                >
                    Latest Winners
                </h2>
                <div
                    className="flex items-center justify-center gap-5 mt-20 mx-auto px-2 flex-col sm:flex-row"
                >
                    <WinnerCard image={Candidate3} alt='Final Winner' />
                </div>
            </div>
        </>
    )
}
export default React.memo(Home);

