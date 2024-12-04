import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'
import Alert from '../../../Components/Alert/Alert'
import DatabaseService from '../../Appwrite/Database'
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Config from '../../../Config/Config'

const ManageFaqs = () => {
    const headers = ['#', 'question', 'answer', 'status', 'update', 'delete']
    const [faqsData, setFaqsData] = useState([])
    const [alert, setAlert] = useState(null)
    const [collection] = useState(Config.appWriteManageFaqsCollID)

    const headerMapping = {
        '$id': '#',
        'question': 'question',
        'answer': 'answer',
        'status': 'status'
    }


    const deleteHandler = async (postID) => {
        const res = await DatabaseService.deleteDocument(collection, postID)
        fetchDataFromDB();
        setAlert(res)
    }

    // Handle post status update
    const handleFaqStatus = useCallback(async (val, docID) => {
        try {
            const newStatus = val === "Pending" ? "Active" : "Pending";
            await DatabaseService.updateDocument(collection, docID, { status: newStatus });
            setAlert({
                message: `Faqs status updated to ${newStatus}`,
                type: newStatus === "Active" ? "success" : "warning",
            });
            fetchDataFromDB();
        } catch (error) {
            console.error("Error updating Faqs status:", error);
        }
    }, []);


    const fetchDataFromDB = useCallback(async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        const modifiedRes = await Promise.all(
            res?.documents?.map(async (faq) => {
                const processedFaq = {}

                Object.keys(headerMapping).forEach((key) => {
                    processedFaq[headerMapping[key]] = faq[key] || "N/A";
                });

                processedFaq['#'] = faq?.$id.split('').reverse('').slice(0, 4).join('');
                processedFaq['question'] = faq?.question;
                processedFaq['answer'] = faq?.answer;

                processedFaq['update'] = (
                    <button className="border size-full rounded bg-sky-50">
                        <Link to={`/admin/updateFaq/${faq["$id"]}`}>
                            <FaRegEdit className="size-7 text-sky-500 mx-auto my-1" />
                        </Link>
                    </button>
                );
                processedFaq['delete'] = (
                    <button
                        className="border px-2 size-full rounded bg-red-50"
                        onClick={() => deleteHandler(faq["$id"])}
                    >
                        <FaDeleteLeft className="size-8 text-red-600 mx-auto my-1" />
                    </button>
                );

                processedFaq["status"] =
                    faq["status"] === "Pending" ? (
                        <div className="w-full text-center">
                            <button
                                className="bg-yellow-600 text-black py-2 px-5 rounded"
                                onClick={() => handleFaqStatus("Pending", faq["$id"])}
                            >
                                Pending
                            </button>
                        </div>
                    ) : (
                        <div className="w-full text-center">
                            <button
                                className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                                onClick={() => handleFaqStatus("Active", faq["$id"])}
                            >
                                Active
                            </button>
                        </div>
                    );

                return processedFaq;
            })
        )
        setFaqsData(modifiedRes)
    }, [])

    useEffect(() => {
        fetchDataFromDB()
    }, [])


    const handleClose = () => {
        setAlert(null);
    };



    return (
        <div>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={handleClose} />
            }
            <h1 className="px-2">Manage Faqs</h1>
            <div className="py-10">
                <div className="my-5 text-end">
                    <Button title={'Add New'} path={'/admin/addFaqs'} />
                </div>
                <Table filter={true} searchInput={true} headers={headers} data={faqsData} />
            </div>
        </div>
    )
}

export default React.memo(ManageFaqs)
