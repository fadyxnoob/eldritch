import React, { useEffect, useRef } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import useGSAPAnimations from '../../Pages/useGSAPAnimations/UseGSAPAnimations';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const WinnerCard = ({ image, alt }) => {
  const winnerCardRef = useRef(null)

  useEffect(() => {
    const imageChildren = winnerCardRef.current.children[0];
    const headingChildren = winnerCardRef.current.children[1];
    const iconsChildren = winnerCardRef.current.children[2];
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: winnerCardRef.current,
          start: "top 50%",
          end: "top bottom",
          toggleActions: "play none none none",
        },
      });

      timeline.from(winnerCardRef.current, {
        opacity: 0,
        xPercent: -150,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(headingChildren, {
          y: 50,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(iconsChildren.children, {
          yPercent: -100,
          duration: 0.2,
          stagger: 0.1,
          ease: "power2.out",
          opacity: 0,
        });

    });
    return () => ctx.revert();
  }, []);



  return (
    <div
      ref={winnerCardRef}
      className='relative overflow-hidden winnerCard h-[450px] w-[90%] sm:w-[300px]'>

      <img src={image} alt={alt} className='size-full object-cover' />

      <h2 className='uppercase bg-primary text-light text-center py-2.5 m-0 absolute bottom-0 w-full '>
        user hunter24
      </h2>

      <ul className='absolute top-0 left-0 m-0 p-0'>
        <li> <a href="#"> <FaFacebookF />  </a> </li>
        <li> <a href="#"> <FaTwitter />    </a> </li>
        <li> <a href="#"> <FaInstagram />  </a> </li>
        <li> <a href="">  <FaYoutube />    </a> </li>
      </ul>
    </div>
  );
}

export default React.memo(WinnerCard);
