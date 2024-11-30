import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../Components/Table/Table';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';

const ManageCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const headers = ['pl id', 'username', 'ig-name', 'ig-id', 'status', 'date', 'candy id'];
    const attributeMapping = {
        'userID': 'pl id',
        'uname': 'username',
        'ign_name': 'ig-name',
        'ig_id': 'ig-id',
        'status': 'status',
        'date': 'date',
        '$id': 'candy id',
    };

    const handleCandyStatus = async (val, docID) => {
        const collectionID = Config.appWriteManageCandidates;
        try {
            // Determine the new status based on the value
            const newStatus = val === 'Pending' ? 'active' : 'Pending';
            
            // Update the status in Appwrite
            const comData = await DatabaseService.updateDocument(collectionID, docID, 'status', newStatus);
            console.log('Status updated:', comData);
    
            // Immediately update the local state to reflect the status change
            setCandidates((prevCandidates) =>
                prevCandidates.map((candidate) =>
                    candidate['$id'] === docID
                        ? { ...candidate, status: newStatus } 
                        : candidate
                )
            );
    
        } catch (error) {
            console.log('Candidate updation Error ::', error);
        }
    };


    const AllCandidates = useCallback(async () => {
        try {
            const data = await DatabaseService.getAllCandidates();
            const processedData = data.documents.map((candidate) => {
                const processedCandidate = {};

                // Assuming your mapping logic
                Object.keys(attributeMapping).forEach((key) => {
                    if (candidate[key]) {
                        processedCandidate[attributeMapping[key]] = candidate[key];
                    } else {
                        processedCandidate[attributeMapping[key]] = "N/A";
                    }
                });

                // Check if $id exists in the candidate
                if (candidate['$id']) {
                    processedCandidate['$id'] = candidate['$id'];
                } else {
                    console.error('No $id found in candidate:', candidate);
                }

                // Rest of your code to format and update status
                processedCandidate['date'] = new Date(processedCandidate['date']).toLocaleDateString();
                processedCandidate['candy id'] = processedCandidate['candy id']?.slice(0, 2) || '';
                processedCandidate['pl id'] = processedCandidate['pl id']?.slice(0, 2) || '';

                processedCandidate['status'] = processedCandidate['status'] === 'Pending' ? (
                    <button
                        className='bg-red-600 text-light py-2 px-5 rounded'
                        onClick={() => handleCandyStatus('Pending', processedCandidate['$id'])}
                    >
                        Pending
                    </button>
                ) : (
                    <button
                        className='bg-green-600 text-light py-2 px-5 rounded'
                        onClick={() => handleCandyStatus('Active', processedCandidate['$id'])}
                    >
                        Active
                    </button>
                );

                return processedCandidate;
            });

            setCandidates(processedData);

        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    }, []);

    useEffect(() => {
        AllCandidates();
    }, [AllCandidates, handleCandyStatus]);



    return (
        <div>
            <h1 className="px-2">Manage Candidates</h1>
            <div className="py-10">
                <Table
                    data={candidates}  // Data passed after mapping and processing
                    headers={headers}
                    searchInput={true}
                    filter={true}
                />
            </div>
        </div>
    );
};

export default React.memo(ManageCandidates);
