import React, { useState, useEffect, useCallback } from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Alert from '../../../Components/Alert/Alert'

const ManageFinalWinner = () => {
    const [alert, setAlert] = useState(null)
    const [winners, setWinners] = useState([])
    const headers = ['#', 'winner', 'loser', 'scores', 'date', 'edit', 'delete']


    const deleteHandler = useCallback(async (ID) => {
        const COLLID = Config.appWriteFinalWinnersCollID;
        const res = await DatabaseService.deleteDocument(COLLID, ID);
        setAlert(res)
    }, [winners])



    const getAllWinners = useCallback(async () => {
        const COLLID = Config.appWriteFinalWinnersCollID;
        try {
            const response = await DatabaseService.getAllDocuments(COLLID);

            // Use Promise.all to resolve all promises in the map
            const modifiedResponse = await Promise.all(
                response.documents.map(async (doc) => {
                    const processedDoc = {};
                    processedDoc['#'] = doc.$id.slice(0, 4);

                    // Fetch winner and loser names
                    const collection = Config.appWriteManageCandidates
                    const winnerName = await DatabaseService.getDocument(doc?.winner, collection);
                    const loserName = await DatabaseService.getDocument(doc?.loser, collection);

                    // Populate processedDoc
                    processedDoc['winner'] = winnerName?.uname || "Unknown Winner";
                    processedDoc['loser'] = loserName?.uname || "Unknown Loser";
                    processedDoc['scores'] = doc.scores;
                    processedDoc['date'] = new Date(doc?.date).toDateString() || "N/A";

                    // Edit and Delete buttons
                    processedDoc['edit'] = (
                        <button className='border size-full rounded bg-sky-50'>
                            <Link to={`/admin/updateFinalResult/${doc['$id']}`}>
                                <FaRegEdit className='size-7 text-sky-500 mx-auto my-1' />
                            </Link>
                        </button>
                    );

                    processedDoc['delete'] = (
                        <button
                            className='border px-2 size-full rounded bg-red-50'
                            onClick={() => deleteHandler(doc['$id'])}
                        >
                            <FaDeleteLeft className='size-8 text-red-600 mx-auto my-1' />
                        </button>
                    );

                    return processedDoc;
                })
            );

            // Set the resolved winners to state
            setWinners(modifiedResponse);
        } catch (error) {
            console.error("Error fetching winners:", error);
        }
    }, [deleteHandler]);

    useEffect(() => {
        getAllWinners()
    }, [getAllWinners, deleteHandler]);

    const closeHandler = useCallback(() => {
        setAlert(null)
    }, [])


    return (
        <div>
            {
                alert && <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeHandler}
                />
            }
            <h1 className="px-2">Manage Final Matches</h1>
            <div className="my-10">
                <div className='text-end mb-3'>
                    <Button title={'add Winner'} path={'/admin/addFinalWinner'} />
                </div>
                <Table headers={headers} data={winners} searchInput={true} filter={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageFinalWinner)
