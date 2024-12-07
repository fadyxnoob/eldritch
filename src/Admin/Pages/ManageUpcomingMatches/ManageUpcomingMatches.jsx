import React, { useState, useEffect, useCallback } from 'react'
import Table from '../../Components/Table/Table'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'
import Alert from '../../../Components/Alert/Alert'

const ManageUpcomingMatches = () => {
    const [alert, setAlert] = useState(null)
    const [upMatches, setUpMatches] = useState([])
    const headers = ['#', 'player 1', 'player 2', 'status', 'date']
    const attributeMapping = {
        '$id': '#',
        'player1': 'player 1',
        'player2': 'player 2',
    };

    const handleMatchStatus = useCallback(async (val, docID) => {
        const collectionID = Config.appWriteManageMatchesCollID;
        try {
            const newStatus = val === 'Pending' ? 'Approved' : 'Pending';
            const response = await DatabaseService.updateDocument(collectionID, docID, { 'status': newStatus });
            if (response) {
                if (newStatus === 'Approved') {
                    setAlert({
                        message: `Match status updated to ${newStatus}`,
                        type: 'success'
                    });
                }
                if (newStatus === 'Pending') {
                    setAlert({
                        message: `Match status updated to ${newStatus}`,
                        type: 'warning'
                    });
                }
            }
        } catch (error) {
            console.log('handle match status error ::', error);
        }
    }, [])


    const getUpcomingMatches = useCallback(async () => {
        try {
            const response = await DatabaseService.getMatches(null, 'clear');
            const thisMatch = await Promise.all(
                response.documents.map(async (match) => {
                    const processedMatch = {};

                    // Map attributes using the provided mapping
                    Object.keys(attributeMapping).forEach((key) => {
                        processedMatch[attributeMapping[key]] = match[key] || 'N/A';
                    });

                    // Format date
                    processedMatch['date'] = match['date']
                        ? new Date(match['date']).toLocaleDateString()
                        : 'N/A';

                    // Fetch player1 and player2 details
                    const candiCollection = Config.appWriteManageCandidates
                    if (match['player1']) {
                        try {
                            const player1Data = await DatabaseService.getDocument(match['player1'], candiCollection);
                            processedMatch['player 1'] = player1Data?.uname || 'N/A';
                        } catch (error) {
                            console.error(`Error fetching player1 data:`, error);
                            processedMatch['player 1'] = 'N/A';
                        }
                    }

                    if (match['player2']) {
                        try {
                            const player2Data = await DatabaseService.getDocument(match['player2'], candiCollection);
                            processedMatch['player 2'] = player2Data?.uname || 'N/A';
                        } catch (error) {
                            console.error(`Error fetching player2 data:`, error);
                            processedMatch['player 2'] = 'N/A';
                        }
                    }

                    // Add status button
                    processedMatch['status'] =
                        match['status'] === 'Pending' ? (
                            <div className='w-full text-center'>
                                <button
                                    className="bg-yellow-600 text-black py-2 px-5 rounded"
                                    onClick={() => handleMatchStatus('Pending', match['$id'])}
                                >
                                    Pending
                                </button>
                            </div>
                        ) : (
                            <div className='w-full text-center'>
                                <button
                                    className="bg-green-600 text-light py-2 px-5 rounded mx-auto"
                                    onClick={() => handleMatchStatus('Approved', match['$id'])}
                                >
                                    Approved
                                </button>
                            </div>
                        );
                    processedMatch['#'] = match['$id']?.slice(0, 4) || '';

                    return processedMatch;
                })
            );

            setUpMatches(thisMatch);
        } catch (error) {
            console.error(`Error fetching matches:`, error);
        }
    }, []);

    useEffect(() => {
        getUpcomingMatches()
    }, [upMatches]);

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
            <h1 className="px-2">Upcoming Matches</h1>
            <div className="my-10">
                <Table headers={headers} data={upMatches} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageUpcomingMatches)
