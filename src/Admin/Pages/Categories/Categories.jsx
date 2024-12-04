import React, { useCallback, useState, useEffect } from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom'
import Alert from '../../../Components/Alert/Alert'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const Categories = () => {
    const [Data, setData] = useState([])
    const [alert, setAlert] = useState(null)
    const [collection] = useState(Config.appWriteCatsCollID)

    const headers = [
        '#', 'title', 'type', 'update', 'delete'
    ]

    const mapping = {
        '$id': '#',
        'cat_name': 'title',
        'type': 'type'
    }

    const deleteHandler = async (postID, fileID) => {
        const res = await DatabaseService.deleteDocument(collection, postID, fileID)
        console.log({ res });
        setAlert(res)
    }

    // Handle post status update
    const handlePostStatus = useCallback(async (val, docID) => {
        const collection = Config.appWritePostsCollID;
        try {
            const newStatus = val === "Pending" ? "Active" : "Pending";
            await DatabaseService.updateDocument(collection, docID, { status: newStatus });
            setAlert({
                message: `Post status updated to ${newStatus}`,
                type: newStatus === "Active" ? "success" : "warning",
            });
            fetchDataFromDB();
        } catch (error) {
            console.error("Error updating post status:", error);
        }
    }, []);

    const fetchDataFromDB = useCallback(async () => {
        const res = await DatabaseService.getAllDocuments(collection);
        const modifiedRes = await Promise.all(
            res.documents.map(async (cat) => {
                const processedCat = {};

                Object.keys(mapping).forEach((key) => {
                    processedCat[mapping[key]] = cat[key] || 'N/A'
                })

                processedCat['#'] = cat?.$id.split('').reverse('').slice(0, 4).join('')
                processedCat['title'] = cat?.cat_name;
                processedCat['type'] = cat?.type;

                processedCat["update"] = (
                    <button className="border size-full rounded bg-sky-50">
                        <Link to={`/admin/updateCategory/${cat["$id"]}`}>
                            <FaRegEdit className="size-7 text-sky-500 mx-auto my-1" />
                        </Link>
                    </button>
                );

                processedCat["delete"] = (
                    <button
                        className="border px-2 size-full rounded bg-red-50"
                        onClick={() => deleteHandler(cat["$id"], cat['image'])}
                    >
                        <FaDeleteLeft className="size-8 text-red-600 mx-auto my-1" />
                    </button>
                );



                return processedCat;
            })
        )
        setData(modifiedRes)

    }, [handlePostStatus])

    useEffect(() => {
        fetchDataFromDB();
    }, [deleteHandler]);





    return (
        <div className='w-full'>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className='px-2'>Manage Categories</h1>
            <div className='text-end'>
                <Button title={'Add Category'} style='' path='/admin/addCategory' />
            </div>
            <div className="p-2 my-5">
                <Table title='' headers={headers} data={Data} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(Categories)
