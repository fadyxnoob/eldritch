import React, { useEffect, useState, useCallback } from 'react'
import Table from '../../Components/Table/Table'
import Config from '../../../Config/Config'
import DatabaseService from '../../Appwrite/Database'
import Alert from "../../../Components/Alert/Alert";


const ManageUsers = () => {
    const [data, setData] = useState([])
    const [alert, setAlert] = useState(null);
    const [collection] = useState(Config.appWriteUsersColl)
    const headers = ["#", "username", 'reports', 'tournaments', 'orders', "status", "image"]
    const mapping = {
        'id': '#',
        'userName': 'username',
        'image': 'image'
    }

    // Handle post status update
    const handleUserStatus = useCallback(async (val, docID) => {
        console.log({ docID });
        try {
            const newStatus = val === "Pending" ? "Active" : "Pending";
            const res = await DatabaseService.updateDocument(collection, docID, { status: newStatus });
            console.log({ res });
            if (res.type === 'success') {
                setAlert({
                    message: `User status updated to ${newStatus}`,
                    type: newStatus === "Active" ? "success" : "warning",
                });
                getData();
            }

        } catch (error) {
            console.error("Error updating post status:", error);
        }
    }, []);

    const getData = async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        const modifiedRes = await Promise.all(
            res.documents.map(async (user) => {
                const processedUser = {}
                Object.keys(mapping).forEach((key) => {
                    processedUser[mapping[key]] = user[key] || 'N/A'
                })

                processedUser['#'] = user.$id.split('').reverse('').slice(0, 4).join('');
                processedUser['userName'] = user.userName
                processedUser['reports'] = user.reports
                processedUser['tournaments'] = user.tournamentsWon
                processedUser['orders'] = user.orders
                processedUser['image'] =
                    <img src={DatabaseService.ViewImage(user.image)} alt={user.userName} className='size-20 object-cover mx-auto border p-1'
                    />
                processedUser['status'] =
                    user["status"] === "Pending" ? (
                        <div className="w-full text-center">
                            <button
                                className="bg-yellow-600 text-black py-2 px-5 rounded"
                                onClick={() => handleUserStatus("Pending", user["$id"])}
                            >
                                Pending
                            </button>
                        </div>
                    ) : (
                        <div className="w-full text-center">
                            <button
                                className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                                onClick={() => handleUserStatus("Active", user["$id"])}
                            >
                                Active
                            </button>
                        </div>
                    );
                return processedUser;
            })
        )
        setData(modifiedRes)
    }

    useEffect(() => {
        getData()
    }, [getData])

    const closeHandler = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={closeHandler} />}
            <h1 className="px-2">Manage Users</h1>

            <div className="my-10">
                <Table headers={headers} data={data} title='' filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default ManageUsers
