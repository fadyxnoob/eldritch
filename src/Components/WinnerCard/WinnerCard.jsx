import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube  } from "react-icons/fa";

const WinnerCard = ({image, alt}) => {
  return (
    <div className='relative overflow-hidden winnerCard'>
        <img src={image} alt={alt} className='size-full object-cover'/>
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
