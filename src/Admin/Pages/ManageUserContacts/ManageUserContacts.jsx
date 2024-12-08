import React, { useEffect, useState, useCallback } from 'react'
import Table from '../../Components/Table/Table'
import Config from '../../../Config/Config'
import DatabaseService from '../../Appwrite/Database'
import Alert from "../../../Components/Alert/Alert";


const ManageUserContacts = () => {
    const [data, setData] = useState([])
    const [alert, setAlert] = useState(null);
    const [collection] = useState(Config.appWriteUsersContactsCollID)
    const headers = ["#", "userName", 'email', 'message', "date", "status"]

    const mapping = {
        '$id': '#',
        'userName': 'userName',
        'userEmail': 'email',
        'userMessage': 'message',
    }

    // Handle post status update
    const handleMessageStatus = useCallback(async (val, docID) => {
        try {
            const newStatus = val === "Pending" ? "Active" : "Pending";
            const res = await DatabaseService.updateDocument(collection, docID, { status: newStatus });
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
    }, [collection]);

    const getData = async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        const modifiedRes = await Promise.all(
            res.documents.map(async (message) => {
                const processedMessage = {}
                Object.keys(mapping).forEach((key) => {
                    processedMessage[mapping[key]] = message[key] || 'N/A'
                })

                processedMessage['#'] = message.$id.split('').reverse('').slice(0, 4).join('');
                processedMessage['userName'] = message.userName
                processedMessage['email'] = <a href={`mailto:{message.userEmail}`}>{message.userEmail}</a>
                processedMessage['message'] = message.userMessage
                processedMessage['date'] = new Date(message.date).toLocaleDateString()
              
                processedMessage['status'] =
                message["status"] === "Pending" ? (
                        <div className="w-full text-center">
                            <button
                                className="bg-yellow-600 text-black py-2 px-5 rounded"
                                onClick={() => handleMessageStatus("Pending", message["$id"])}
                            >
                                Pending
                            </button>
                        </div>
                    ) : (
                        <div className="w-full text-center">
                            <button
                                className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                                onClick={() => handleMessageStatus("Active", message["$id"])}
                            >
                                Active
                            </button>
                        </div>
                    );
                return processedMessage;
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
            <h1 className="px-2">Manage Users Contacts</h1>

            <div className="my-10">
                <Table headers={headers} data={data} title='' filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageUserContacts)
