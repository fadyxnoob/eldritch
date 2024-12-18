import React, { useRef } from 'react';
import { FaPlay } from "react-icons/fa";
import stream from '../../assets/images/stream.jpg'
import useGSAPAnimations from '../../UseGSAPAnimations/UseGSAPAnimations';
import gsap from 'gsap'

const LiveStream = () => {

  const liveStreamRef = useRef();

  useGSAPAnimations(() => {
    // const timeline = gsap.timeline();

    if (liveStreamRef.current) {
      gsap.from(liveStreamRef.current.children[0], {
        opacity: 0,
        y: -150,
        scale: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: liveStreamRef.current.children[0],
          start: 'top 90%', 
          end: 'top top',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.from(liveStreamRef.current.children[1], {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: liveStreamRef.current.children[1],
          start: 'top 90%', 
          end: 'top top',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Animate the first child (image)
      gsap.from(liveStreamRef.current.children[2], {
        scrollTrigger: {
          trigger: liveStreamRef.current.children[2],
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        transformOrigin: "center",
        scaleX: 0,
        scaleY: 1,
        onStart: () => {
          gsap.to(liveStreamRef.current.children[2], {
            scaleX: 1,
            scaleY: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
      });

      // Animate the second child (play button inside the div)
      gsap.from(liveStreamRef.current.children[2].querySelector('.playButton'), {
        scale: 5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: liveStreamRef.current.children[2].querySelector('.playButton'),
          start: 'top 90%',
          end: 'top top',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, []);


  return (
    <div className='overflow-hidden' ref={liveStreamRef}>
      <h3 className='text-5xl font-medium text-center'>Live Stream</h3>
      <p className='text-center mt-10'>Stream Closed...</p>
      <div className='md:h-screen liveStream mt-2 relative h-96'>
        <img src={stream} alt="Stream" className='size-full object-cover' />
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="playButton flex items-center justify-center size-20 rounded-full cursor-pointer">
            <FaPlay className='size-6 button-animate text-light' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LiveStream);
