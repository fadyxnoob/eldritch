import React, { useState, useEffect } from "react";
import { MdRemoveRedEye, MdShoppingBag } from "react-icons/md";
import { Category } from "../../";
import authService from "../../Appwrite/Auth";
import service from "../../Appwrite/Conf";
import { Link } from "react-router-dom";

const ProductCategory = ({ customWidth = "w-[40%]", id }) => {
  const [loading, setLoading] = useState(true);
  const [pros, setPros] = useState([]);
  const [images, setImages] = useState({});
  const [selectedCat, setSelectedCat] = useState("");

  const getCatProducts = async () => {
    setLoading(true);
    try {
      const fetchPros = await authService.getProsByCat(id);
      console.log('pross are ::', fetchPros);
      const catName = await authService.getCatName(id);

      setSelectedCat(catName);

      if (fetchPros.documents && fetchPros.documents.length > 0) {
        setPros(fetchPros.documents);
        const newImages = {};
        fetchPros.documents.forEach((pro) => {
          newImages[pro.$id] = service.ViewImage(pro.image);
        });
        setImages(newImages);
      } else {
        setPros([]);
        setImages({});
      }
    } catch (error) {
      console.error("Error fetching products or category name:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getCatProducts();
    }
  }, [id]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <div className="banner shopBg">
        <h1 className="text-5xl text-light font-bold border-b-4 border-primary capitalize">
          Our {selectedCat.cat_name || "Products"}
        </h1>
      </div>

      <div className="flex mx-20">
        <div className="w-[70%]">
          <div className="flex flex-wrap gap-5 mt-5 mobile:px-2 mobile:flex-col sm:items-center sm:justify-start productCardContainer">
            {pros.length > 0 ? (
              pros.map((pro) => {
                return (
                  pro.status && (
                    <div
                      className={`${customWidth} productCard cursor-pointer relative rounded overflow-hidden mobile:w-full shadow-md shadow-black`}
                      key={pro.$id}
                    >
                      <div className="size-full">
                        <img
                          src={images[pro.$id]}
                          alt={pro.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="absolute top-5 right-5 gap-5 flex flex-col">
                        <Link to={`/product/${pro.$id}`}>
                          <div className='w-10 h-10 flex items-center justify-center bg-primary rounded text-light'>
                            <MdRemoveRedEye className='w-5 h-5' />
                          </div>
                        </Link>
                        <div className="w-10 h-10 flex items-center justify-center bg-primary rounded text-light">
                          <MdShoppingBag className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )
                );
              })
            ) : (
              <p className="text-center w-full text-gray-500">
                No Product Found
              </p>
            )}
          </div>
        </div>

        <div className="w-[30%] pt-8">
          <Category getType="product" setType="pro" />
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
