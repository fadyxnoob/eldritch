import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import DatabaseService from '../../Appwrite/Database'
import Alert from '../../../Components/Alert/Alert'
import Config from '../../../Config/Config'

const AddCategory = () => {
    const [category, setCategory] = useState({ title: '', option: '' });
    const [alert, setAlert] = useState(null);
    const [collection] = useState(Config.appWriteCatsCollID);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.title || !category.option) {
            setAlert({ type: 'error', message: 'Please fill all the data.' });
            return; 
        }

        try {
            let data = { cat_name: category.title, type: category.option };
            const res = await DatabaseService.addDocument(collection, data);
            if(res){
                setAlert({ type: 'success', message: 'New Category is Added' });
                setTimeout(() => {
                    navigate('/admin/manage-categories')
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            setAlert({ type: 'error', message: 'Failed to add New Category' });
        }
    };

    return (
        <>
            {/* Display the alert if it exists */}
            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <h1 className='px-2'>Add Category</h1>
            <div className='boxShadow my-10 p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center gap-5 md:flex-row flex-col'>
                        <div className='w-full'>
                            <label htmlFor="catName">Category Name</label> <br />
                            <input
                                id='catName'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={category.title}
                                onChange={(e) => setCategory((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="type">Type</label> <br />
                            <select
                                onChange={(e) => setCategory((prev) => ({ ...prev, option: e.target.value }))}
                                id="type"
                                className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                            >
                                <option value="post" className='h-10 p-2'>Post</option>
                                <option value="product" className='h-10 p-2'>Product</option>
                            </select>
                        </div>
                    </div>
                    <Button title={'Add Category'} style={'mt-5 px-5'} />
                </form>
            </div>
        </>
    );
};

export default React.memo(AddCategory);
