import React, { useCallback, useState, useEffect } from 'react'
import Button from '../../Components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Alert from '../../../Components/Alert/Alert';

const UpdateCategory = () => {
    const { categoryID } = useParams();
    const [category, setCategory] = useState({ cat_name: '', type: '' });
    const [collection] = useState(Config.appWriteCatsCollID)
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const getCategory = useCallback(async () => {
        try {
            const res = await DatabaseService.getDocument(categoryID, collection);
            setCategory(res);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    }, [categoryID, collection]);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            let newData = {
                cat_name: category.cat_name,
                type: category.type
            }
            const res = await DatabaseService.updateDocument(collection, categoryID, newData);
            if (res) {
                setAlert(res);
                setTimeout(() => {
                    navigate('/admin/manage-categories')
                    setAlert(null)
                }, 1000);
            }

        } catch (error) {
            console.error('Error updating category:', error);
            setAlert(res)
        }
    }, [category, categoryID, collection]);


    const closeHandler = useCallback(() => {
        setAlert(null);
    }, []);


    return (
        <>
            {alert && (
                <Alert message={alert.message} type={alert.type} onClose={closeHandler} />
            )}
            <h1 className='px-2'>Update Category</h1>
            <div className='boxShadow my-10 p-5'>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='flex justify-between items-center gap-5'>
                        <div className='w-full'>
                            <label htmlFor="catName">Category Name</label> <br />
                            <input
                                id='catName'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={category.cat_name}
                                onChange={(e) => setCategory((prev) => ({ ...prev, cat_name: e.target.value }))}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="type">Type</label> <br />
                            <select
                                value={category.type}
                                name="" id="type"
                                className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                                onChange={(e) => setCategory((prev) => ({ ...prev, type: e.target.value }))}
                            >
                                <option value="post" className='h-10 p-2'>Post</option>
                                <option value="product" className='h-10 p-2'>Product</option>
                            </select>
                        </div>
                    </div>
                    <Button title={'Update'} style={'mt-5 px-5'} />
                </form>
            </div>
        </>
    )
}

export default React.memo(UpdateCategory)
