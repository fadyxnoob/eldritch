import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'
import Alert from "../../../Components/Alert/Alert";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Button from '../../Components/Button/Button'


const ManageProducts = () => {
    const [allDocs, setAllDocs] = useState([])
    const [alert, setAlert] = useState(null);
    const headers = ['#', 'title', 'category', 'price', 'status', 'popular', 'image', 'update', 'delete']
    const headersMapping = {
        '$id': '#',
        'name': 'title',
        'cat': 'category',
        'price': 'price',
        'status': 'status',
        'popular': 'popular',
        'image': 'image'
    }

    const deleteHandler = async (docID, fileID) => {
        const collection = Config.appWriteProductCollID;
        const res = await DatabaseService.deleteDocument(collection, docID, fileID)
        setAlert(res)
    }

    const handleProStatus = useCallback(async (val, id) => {
        const collection = Config.appWriteProductCollID;
        const newStatus = val === 'Pending' ? 'Active' : 'Pending'
        await DatabaseService.updateDocument(collection, id, { status: newStatus })
        setAlert({
            message: `Product status updated to ${newStatus}`,
            type: newStatus === "Active" ? "success" : "warning",
        });
        fetchAllProducts()
    }, [])

    const handlePopStatus = useCallback(async (val, id) => {
        const collection = Config.appWriteProductCollID;
        const newStatus = val === 'false' ? 'true' : 'false'
        await DatabaseService.updateDocument(collection, id, { popular: newStatus })
        setAlert({
            message: `Popular status updated to ${newStatus}`,
            type: newStatus === "true" ? "success" : "warning",
        });
        fetchAllProducts()

    }, [])

    const fetchAllProducts = useCallback(async () => {
        const collection = Config.appWriteProductCollID;
        const res = await DatabaseService.getAllDocuments(collection)
        const modifiedRes = await Promise.all(
            res.documents.map(async (pro) => {
                const processedProduct = {};
                Object.keys(headersMapping).forEach((key) => {
                    processedProduct[headersMapping[key]] = pro['key'] || 'N/A'
                })

                processedProduct['#'] = pro['$id'].split('').reverse('').join('').slice(0, 4)
                processedProduct['title'] = pro['name'].split(' ').slice(0, 5).join('  ');
                const catCollection = Config.appWriteCatsCollID;
                const catName = await DatabaseService.getDocument(pro['cat'], catCollection)
                processedProduct['category'] = catName.cat_name;
                processedProduct['price'] = '$' + pro['price']
                processedProduct['popular'] = pro['popular'] === 'false' ? (
                    <div className="w-full text-center">
                        <button
                            className="bg-yellow-600 text-black py-2 px-5 rounded"
                            onClick={() => handlePopStatus("false", pro["$id"])}
                        >
                            No
                        </button>
                    </div>
                ) : (
                    <div className="w-full text-center">
                        <button
                            className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                            onClick={() => handlePopStatus("true", pro["$id"])}
                        >
                            Yes
                        </button>
                    </div>
                )
                processedProduct['image'] = <img src={DatabaseService.ViewImage(pro.image)} alt="product image" className="size-20 object-cover" />
                processedProduct['status'] = pro.status === 'Pending' ? (
                    <div className="w-full text-center">
                        <button
                            className="bg-yellow-600 text-black py-2 px-5 rounded"
                            onClick={() => handleProStatus("Pending", pro["$id"])}
                        >
                            Pending
                        </button>
                    </div>
                ) : (
                    <div className="w-full text-center">
                        <button
                            className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                            onClick={() => handleProStatus("Active", pro["$id"])}
                        >
                            Active
                        </button>
                    </div>
                )

                processedProduct['update'] = <button className="border size-full rounded bg-sky-50">
                    <Link to={`/admin/updateProduct/${pro["$id"]}`}>
                        <FaRegEdit className="size-7 text-sky-500 mx-auto my-1" />
                    </Link>
                </button>

                processedProduct['delete'] = <button
                    className="border px-2 size-full rounded bg-red-50"
                    onClick={() => deleteHandler(pro["$id"], pro['image'])}
                >
                    <FaDeleteLeft className="size-8 text-red-600 mx-auto my-1" />
                </button>

                return processedProduct;
            })
        )

        setAllDocs(modifiedRes);
    }, [handleProStatus, handlePopStatus])

    useEffect(() => {
        fetchAllProducts()
    }, [deleteHandler]);

    const closeHandler = useCallback(() => {
        setAlert(null);
    }, []);


    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={closeHandler} />}
            <h1 className="px-2">Manage Products</h1>
            <div className="py-10">
                <div className="text-end mb-3">
                    <Button title={'add Product'} path={'/admin/addProduct'} />
                </div>
                <Table filter={true} searchInput={true} headers={headers} data={allDocs} />
            </div>
        </div>
    )
}

export default React.memo(ManageProducts)
