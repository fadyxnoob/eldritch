import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import service from '../../Appwrite/Conf';
import authService from '../../Appwrite/Auth';
import { Link } from 'react-router-dom';

const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [catNames, setCatNames] = useState({});

    // Helper function to parse date
    const parseDate = (dateString) => {
        if (!dateString) return null;
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return new Date(`${year}-${month}-${day}`);
        }
        return new Date(dateString); // Assume valid format
    };

    const fetchCatNames = async (posts) => {
        const categoryNames = {};
        for (const post of posts) {
            try {
                const data = await authService.getCatName(post.cat);
                categoryNames[post.cat] = data.cat_name;
            } catch (error) {
                console.error(`Failed to fetch category name for ID: ${post.cat}`, error);
                categoryNames[post.cat] = 'Unknown';
            }
        }
        setCatNames(categoryNames);
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await service.getAllPosts();
                if (data) {
                    const posts = data.documents;
                    setPosts(posts);

                    posts.forEach((post) => {
                        const imageUrl = service.ViewImage(post.image);
                        setImages((prevImages) => ({ ...prevImages, [post.$id]: imageUrl }));
                    });

                    await fetchCatNames(posts);
                    setLoading(false);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setPosts([]);
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`flex flex-wrap gap-4`}>
            {posts.map((post) => {
                const parsedDate = parseDate(post.date);
                const day = parsedDate ? parsedDate.getDate() : 'N/A';
                const month = parsedDate
                    ? parsedDate.toLocaleString('default', { month: 'short' })
                    : 'N/A';

                return (
                    <div key={post.$id}
                        className={`w-[90%] relative rounded overflow-hidden shadow-md shadow-black sm:w-[45%] md:w-[32%]`}
                    >
                        <div className="overflow-hidden">
                            <img
                                src={images[post.$id]}
                                alt={post.title}
                                className="h-64 object-cover hover:scale-110 transition-all duration-500 ease-in-out"
                            />
                        </div>

                        <div className="relative p-5">
                            <p className="font-semibold text-primary underline uppercase">
                                <Link to={`/category/${post.cat}?type=post`}>
                                    {catNames[post.cat] || 'Loading...'}
                                </Link>
                            </p>
                            <Link to={`/post/${post.$id}`}>
                                <h4 className="text-lg font-semibold mt-2 hover:text-blue-600 hover:underline">
                                    {post.title}
                                </h4>
                            </Link>
                            <div className="flex justify-end gap-2 items-center mt-5">
                                <FaUser /> <p className="uppercase">{post.author}</p>
                            </div>

                            <div className="absolute flex items-center justify-center postDatePart overflow-hidden rounded">
                                <div className="shadow-sm p-4 border flex items-center justify-center flex-col sectionInner overflow-hidden">
                                    <h4 className="font-bold text-lg">{day}</h4>
                                    <p className="text-sm">{month}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(PostCard);
