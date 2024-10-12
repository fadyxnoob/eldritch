import React from 'react';
import { FaUser } from "react-icons/fa";

const PostCard = ({ image, alt, cat, title, user, day, month }) => {
    
    const titleDosts = (title) => {
        if(title.length >= 60){
            return (title.slice(0, 60) + '...')
        }else{
            return (title+'...')
        }
    }
    return (
        <div className='postCard cursor-pointer rounded-sm overflow-hidden mobile:w-full shadow-sm shadow-black'>
            <div className='overflow-hidden'>
                <img src={image} alt={alt} className='h-64 object-cover hover:scale-110 transition-all duration-500 ease-in-out ' />
            </div>
            <div className="relative p-5">
                <a href='#' className='font-semibold text-primary underline uppercase'>{cat}</a>
                <h4 className='text-lg font-semibold mt-2'>
                  {titleDosts(title)}
                </h4>
                <div className='flex justify-end gap-2 items-center mt-5'>
                    <FaUser /> <p className='uppercase'>{user}</p>
                </div>

                <div className="absolute flex items-center justify-center postDatePart overflow-hidden rounded">
                    <div className="shadow-sm p-4 border flex items-center justify-center flex-col  sectionInner overflow-hidden">
                        <h4 className='font-bold text-2xl'>{day}</h4>
                        <p className='text-sm'>{month}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PostCard;
