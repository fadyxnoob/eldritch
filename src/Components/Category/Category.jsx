import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import authService from '../../Appwrite/Auth.js';

const Category = ({ getType = 'post' }) => {
    const [loading, setLoading] = useState(true)
    const [cats, setCats] = useState([])
    const [counter, setCounter] = useState({})

    const getAllCategories = async () => {
        const catsAll = await authService.getAllCategories();

        if (catsAll.documents && catsAll.documents.length > 0) {
            const filteredCategories = catsAll.documents.filter((cat) => cat.type === getType);

            // Fetch the count for each category
            const fetchCounters = filteredCategories.map((cat) =>
                authService.getProsByCat(cat.$id)
                    .then((res) => {
                        setCounter(prevCounter => ({
                            ...prevCounter,
                            [cat.$id]: res.total,
                        }));
                    }).catch((error) => {
                        console.log(error);
                    })
            );

            await Promise.all(fetchCounters);
            setCats(filteredCategories);
            setLoading(false);
        } else {
            setCats([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [getType]);

    if (loading) {
        return <p>Loading....</p>
    }

    return (
        <>
            <div className='mt-2 boxShadow'>
                <h3 className='text-2xl border-b-2 px-3'>Categories</h3>
                {cats.length > 0 ? (
                    cats.filter((cat) => counter[cat.$id] > 0)
                        .map((cat) => (
                            <div className='flex justify-between items-center h-10 px-3 border-b-2' key={cat.$id}>
                                <NavLink to={`/category/${cat.$id}`}>
                                    <h4 className='text-primary capitalize'>{cat.cat_name}</h4>
                                </NavLink>
                                <span>{counter[cat.$id]}</span>
                            </div>
                        ))
                ) : (
                    <div className="px-3 py-2">No Categories</div>
                )}
            </div>
        </>
    );
}

export default Category;
