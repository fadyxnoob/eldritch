import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database'
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Config from '../../../Config/Config';

const ManagePollMatches = () => {
    const [allPollResults, setAllPollResults] = useState([])
    const headers = ['#', 'player 1', 'player 2', 'winner', 'scores', 'date', 'edit', 'delete']
    const mapping = {
        '$id': '#',
        'winner': 'player 1',
        'loser': 'player 2',
    }


    const getResults = useCallback(async () => {
        try {
            const response = await DatabaseService.getPollMatchesResults();

            // Use Promise.all to handle asynchronous calls properly
            const processedData = await Promise.all(
                response.documents.map(async (match) => {
                    const processedMatch = {};

                    // Process each key in the mapping
                    for (const key of Object.keys(mapping)) {
                        processedMatch[mapping[key]] = match[key] || 'N/A';
                    }

                    // Handle date and scores
                    processedMatch['date'] = new Date(match['date']).toLocaleDateString();
                    processedMatch['scores'] = match['wscores'] + "/" + match['lscores'];
                    processedMatch['#'] = processedMatch['#']?.slice(0, 4) || '#';

                    // Fetch player1 details
                    const player1 = processedMatch['player 1'];
                    const collection = Config.appWriteManageCandidates
                    if (player1 && player1 !== 'N/A') {
                        const pl1 = await DatabaseService.getDocument(player1, collection);
                        processedMatch['player 1'] = pl1?.uname || 'Unknown Player';
                        processedMatch['winner'] = pl1?.uname || 'Unknown Player'
                    }

                    const player2 = processedMatch['player 2'];
                    if (player2 && player2 !== 'N/A') {
                        const pl1 = await DatabaseService.getDocument(player2, collection);
                        processedMatch['player 2'] = pl1?.uname || 'Unknown Player';
                    }

                    processedMatch['edit'] = <button
                        className='border size-full rounded bg-sky-50'

                    >
                        <Link to={`/admin/updateMatch/${match['$id']}`}>
                            <FaRegEdit className='size-7  text-sky-500 mx-auto my-1' />
                        </Link>
                    </button>

                    processedMatch['delete'] = <button
                        className='border px-2 size-full rounded bg-red-50'
                        
                    >
                        <FaDeleteLeft className='size-8 text-red-600 mx-auto my-1' />
                    </button>



                    return processedMatch;
                })
            );

            // Set the processed data
            setAllPollResults(processedData);
        } catch (error) {
            console.error('Error in getResults:', error);
        }
    }, []);

    useEffect(() => {
        getResults()

    }, [getResults]);
    return (
        <div>
            <h1 className="px-2">Manage Poll Matches</h1>
            <div className="my-10">
                <div
                    className='text-end mb-5'
                >
                    <Button title={'Add Result'} path={'/admin/addLastMatchResult'} />
                </div>
                <Table headers={headers} data={allPollResults} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default ManagePollMatches
