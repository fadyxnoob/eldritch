import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Button from '../../Components/Button/Button';
import Alert from '../../../Components/Alert/Alert';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFinalWinner = () => {
    const [matchData, setMatchData] = useState(null);
    const [winner, setWinner] = useState('');
    const [loser, setLoser] = useState('');
    const [playerNames, setPlayerNames] = useState({});
    const [scores, setScores] = useState('');
    const [alert, setAlert] = useState(null);
    const { finalID } = useParams();
    const navigate = useNavigate();

    // Fetch match data for the given finalID
    const fetchMatchData = useCallback(async () => {
        try {
            const collection = Config.appWriteFinalWinnersCollID;
            const res = await DatabaseService.getDocument(finalID, collection);

            if (res && res.scores) {
                setMatchData(res);
                setWinner(res.winner);
                setLoser(res.loser);
                setScores(res.scores);
                // Parse scores into winner and loser scores

                // Preload player names
                [res.winner, res.loser].forEach((player) => fetchPlayerName(player));
            }
        } catch (error) {
            console.error('Error fetching match data:', error);
        }
    }, [finalID]);

    // Fetch player name by ID
    const fetchPlayerName = useCallback(async (id) => {
        if (playerNames[id]) return; // Avoid duplicate fetches
        try {
            const collection = Config.appWriteManageCandidates;
            const res = await DatabaseService.getDocument(id, collection);
            setPlayerNames((prev) => ({ ...prev, [id]: res.uname }));
        } catch (error) {
            console.error('Error fetching player name:', error);
        }
    }, [playerNames]);

    const handleWinnerChange = useCallback((value) => {
        setWinner(value);
        if (value === matchData.winner) {
            setLoser(matchData.loser);
        } else if (value === matchData.loser) {
            setLoser(matchData.winner);
        }
    }, [matchData]);

    // Handle form submission
    const submitHandler = useCallback(async () => {
        try {
            const collID = Config.appWriteFinalWinnersCollID
            const updateData = {winner, loser, scores}
            const res = await DatabaseService.updateDocument(collID, finalID, updateData);
            if (res) {
                setAlert(res);
                setTimeout(() => {
                    navigate('/admin/manageFinalWinner');
                }, 1000);
            }
        } catch (error) {
            console.error('Error submitting final result:', error);
        }
    }, [matchData, winner, loser, scores, navigate]);

    useEffect(() => {
        fetchMatchData();
    }, [fetchMatchData]);

    const closeHandler = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <div>
            {alert && (
                <Alert message={alert.message} type={alert.type} onClose={closeHandler} />
            )}
            <h1 className="px-2">Update Final Winner</h1>
            <div className="my-10 boxShadow p-5">
                <form
                    className="p-2 rounded"
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                        <div className="w-full mb-4">
                            <label htmlFor="matchId">Match ID</label> <br />
                            <input
                                id="matchId"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={finalID}
                                disabled
                            />
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="scores">Scores</label> <br />
                            <input
                                id="scores"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={scores}
                                onChange={(e) => setScores(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                        <div className="w-full mb-4">
                            <label htmlFor="winner">Select Winner</label> <br />
                            <select
                                id="winner"
                                value={winner}
                                onChange={(e) => handleWinnerChange(e.target.value)}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                {matchData &&
                                    [matchData.winner, matchData.loser].map((player) => (
                                        <option key={player} value={player}>
                                            {playerNames[player] || 'Loading...'}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="w-full mb-4">
                            <label htmlFor="loser">Loser</label> <br />
                            <input
                                id="loser"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={playerNames[loser] || 'Loading...'}
                                disabled
                            />
                        </div>
                    </div>

                    <Button title="Update Winner" />
                </form>
            </div>
        </div>
    );
};

export default React.memo(UpdateFinalWinner);
