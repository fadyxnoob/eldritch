import React, { useState, useEffect, useCallback } from 'react'
import Table from '../../Components/Table/Table'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'

const ManageCurrentMatches = () => {
    const [currMatches, setUpMatches] = useState([])
    const headers = ['#', 'player 1', 'player 2', 'status', 'date']
    const attributeMapping = {
        '$id': '#',
        'player1': 'player 1',
        'player2': 'player 2',
    };

    const handleMatchStatus = useCallback(async (val, docID) => {
        const collectionID = Config.appWriteManageMatchesCollID;
        try {
            const newStatus = val === 'Approved' ? 'Played' : 'Approved';
            const response = await DatabaseService.updateDocument(collectionID, docID, 'status', newStatus);
            console.log(response);

        } catch (error) {
            console.log('handle match status error ::', error);
        }

    }, [])


    const getUpcomingMatches = useCallback(async () => {
        try {
            const response = await DatabaseService.getMatches(null, 'pending');
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
                        match['status'] === 'Approved' ? (
                            <button
                                className="bg-red-600 text-light py-2 px-5 rounded"
                                onClick={() => handleMatchStatus('Approved', match['$id'])}
                            >
                                Approved
                            </button>
                        ) : (
                            <button
                                className="bg-green-600 text-light py-2 px-5 rounded"
                                onClick={() => handleMatchStatus('Played', match['$id'])}
                            >
                                Played
                            </button>
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
    }, [currMatches]);


    return (
        <div>
            <h1 className="px-2">Current Matches</h1>
            <div className="my-10">
                <Table headers={headers} data={currMatches} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageCurrentMatches)
