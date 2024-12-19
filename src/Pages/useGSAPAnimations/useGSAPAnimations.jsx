// src/hooks/useGSAPAnimations.js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const useGSAPAnimations = (animationCallback, dependencies = []) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animationCallback();
    });
    return () => ctx.revert(); 
  }, dependencies);
};

export default useGSAPAnimations;
