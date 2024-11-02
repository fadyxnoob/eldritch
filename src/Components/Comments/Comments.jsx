import React from 'react';

const Comments = ({ product }) => {
    console.log('uugewr',product);
    return (
        <>
            <h1>({product.comments}) comments for ( {product.title} )</h1>
            {
                product.comments ? <div className="border p-5 rounded-sm flex justify-between w-full mt-2">
                    <div>
                        <strong>Yasir</strong>
                        <p className='text-sm mt-2'>
                            Boht Acha product hai
                        </p>
                    </div>
                    <div>
                        08 Nov 2024
                    </div>
                </div> : null
            }
        </>
    );
}

export default Comments;
