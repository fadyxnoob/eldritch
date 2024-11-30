import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Alert from '../../../Components/Alert/Alert';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { Query, ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [alert, setAlert] = useState(null);
    const { productID } = useParams();
    const [product, setProduct] = useState({ name: "", cat: "", price: "", disc: "", image: null });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [allCat, setAllCat] = useState([]);
    const navigate = useNavigate();

    const getCategories = useCallback(async () => {
        try {
            const collection = Config.appWriteCatsCollID;
            const params = [Query.equal('type', 'product')]
            const categories = await DatabaseService.getAllDocuments(collection, params);
            setAllCat(categories.documents);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, []);

    const getProduct = useCallback(async () => {
        const collection = Config.appWriteProductCollID;
        try {
            const res = await DatabaseService.getDocument(productID, collection);
            setProduct(res);
            if (res.image) {
                setImagePreview(DatabaseService.ViewImage(res.image));
            }
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }, [productID]);

    // Handle image change (file upload)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };


    useEffect(() => {
        getCategories();
        getProduct();
    }, [getCategories, getProduct]);


    const handleSubmit = async () => {
        try {
            const collection = Config.appWriteProductCollID;
            let updatedProduct = {
                name: product.name,
                disc: product.disc,
                cat: product.cat,
                price: product.price
            };

            if (image) {
                if (product.image) {
                    await DatabaseService.deleteFile(product.image);
                }
                const fileID = ID.unique();
                console.log({ fileID });
                const fileResponse = await DatabaseService.uploadFile(fileID, image);
                updatedProduct = { ...updatedProduct, image: fileID };
            } else {
                updatedProduct = { ...updatedProduct, image: product.image };
            }
            console.log({updatedProduct});
            const response = await DatabaseService.updateDocument(collection, productID, updatedProduct);
            if (response) {
                setAlert({
                    message: "Product updated successfully!",
                    type: 'success',
                });
            }

            setTimeout(() => {
                navigate('/admin/manageProducts')
            }, 1000);
        } catch (error) {
            console.error("Error updating post:", error);
            setAlert({
                message: "Error updating product. Please try again.",
                type: 'error',
            });
        }
    };


    return (
        <div
        >
            {alert && <Alert message={alert.message} type={alert.type} />}
            <h1 className="px-2">Update Product</h1>
            <div className="my-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="p-5 boxShadow">
                    <div className="flex gap-5 flex-col md:flex-row">
                        <div className="w-full">
                            <label htmlFor="Title">Title</label> <br />
                            <input
                                id="Title"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                                value={product.name}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="type">Category</label> <br />
                            <select
                                name=""
                                id="type"
                                className="mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                                onChange={(e) => setProduct((prev) => ({ ...prev, cat: e.target.value }))}
                                value={product.cat}
                            >
                                {allCat.length > 0 ? (
                                    allCat.map((category) => (
                                        <option key={category.$id} value={category.$id} className="h-10 p-2">
                                            {category.cat_name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No categories available</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col md:flex-row justify-between items-end gap-5 mb-3">
                        <div className="w-full">
                            <label htmlFor="Price">Price</label> <br />
                            <input
                                id="Price"
                                type="number"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
                                value={product.price}
                                min={'0'}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <label
                                htmlFor="uploadImage"
                                className="text-black border border-primary cursor-pointer p-2"
                            >
                                Upload Image
                            </label>
                            {image && <span className="text-black text-sm">{image.name}</span>}
                            <input
                                type="file"
                                className="hidden"
                                id="uploadImage"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover w-24 h-24 rounded border"
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <textarea
                            onChange={(e) => setDisc(e.target.value)}
                            value={product.disc}
                            cols="30"
                            rows="10"
                            className="resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2"
                        ></textarea>
                    </div>
                    <Button title={'Add Post'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(UpdateProduct)
