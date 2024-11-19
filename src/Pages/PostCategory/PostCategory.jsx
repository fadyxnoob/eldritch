import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import authService from '../../Appwrite/Auth'
import service from '../../Appwrite/Conf'
import { Category } from '../../'
import { Link } from 'react-router-dom';


const PostCategory = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [catNames, setCatNames] = useState({});
  const [selectedCat, setSelectedCat] = useState('')

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateString);
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
        const data = await authService.getPostsByCat(id);
        console.log("Fetched data:", data);
        const catName = await authService.getCatName(id);
        console.log('fetch cat', catName);
        setSelectedCat(catName);

        if (data && data.documents && Array.isArray(data.documents)) {
          const posts = data.documents;
          setPosts(posts);

          posts.forEach((post) => {
            const imageUrl = service.ViewImage(post.image);
            setImages((prevImages) => ({ ...prevImages, [post.$id]: imageUrl }));
          });

          await fetchCatNames(posts);
        } else {
          console.error("Invalid data structure or no documents found:", data);
          setPosts([]); 
        }

      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [id]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='banner aboutBG'>
        <h1
          className='text-5xl text-light font-bold border-b-4 border-primary'
        >
          {selectedCat.cat_name}
        </h1>
      </div>
      <div className={`flex flex-wrap gap-4 my-20 mx-20`}>
        {posts.map((post) => {
          const parsedDate = parseDate(post.date);
          const day = parsedDate ? parsedDate.getDate() : 'N/A';
          const month = parsedDate
            ? parsedDate.toLocaleString('default', { month: 'short' })
            : 'N/A';

          return (
            <div key={post.$id}
              className={`w-[30%]  cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black `}
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
                <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
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

      <div className="flex mx-20">
        <div className="w-[70%]">
        </div>
        <div className="w-[30%] pt-8">
          <Category getType='post' setType='post' />
        </div>
      </div>
    </>
  );
}

export default PostCategory