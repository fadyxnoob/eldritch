import React from 'react';
const MemberCard = ({name, role, rank, image}) => {
    return (
        <div className='w-full sm:w-[50%] lg:w-[35%]'>
            <div className='memberBox size-full'>
                <img src={image} alt={image} className='w-full h-96 object-cover rounded' />
                <span></span>
            </div>
               <div className="my-5">
               <h3 className='text-center text-5xl'>{name}</h3>
                <p className='text-center text-lg'>{rank}</p>
                <p className='text-center text-lg'>{role}</p>
               </div>
        </div>
    );
}

export default MemberCard;
