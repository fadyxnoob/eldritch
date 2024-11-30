import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import { Query } from 'appwrite';
import Button from '../../Components/Button/Button';
import Table from '../../Components/Table/Table';
import Alert from '../../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom';

const AddFinalWinner = () => {
    const [latestFinals, setLatestFinals] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [winner, setWinner] = useState('');
    const [loser, setLoser] = useState('');
    const [playerNames, setPlayerNames] = useState({});
    const [scores, setScores] = useState('');
    const [oneFinal, setOneFinal] = useState([]);
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate();

    const getLatestFinals = useCallback(async () => {
        const COLLID = Config.appWriteMatchesResultsCollID;
        const queryParams = [Query.equal('final', 'true')];
        try {
            const res = await DatabaseService.getAllDocuments(COLLID, queryParams);
            setLatestFinals(res.documents);
            if (res.documents.length > 0) {
                const firstMatch = res.documents[0];
                setSelectedMatch(firstMatch);
                setScores(`${firstMatch.wscores} / ${firstMatch.lscores}`);
                setWinner(firstMatch.winner);
                setLoser(firstMatch.loser);
            }
        } catch (error) {
            console.error('Error fetching finals:', error);
        }
    }, []);

    useEffect(() => {
        getLatestFinals();
    }, [getLatestFinals]);

    const getPlayerName = useCallback(async (id) => {
        if (playerNames[id]) return playerNames[id];
        try {
            const collection = Config.appWriteManageCandidates
            const res = await DatabaseService.getDocument(id, collection);
            setPlayerNames((prev) => ({ ...prev, [id]: res.uname }));
            return res.uname;
        } catch (error) {
            console.error('Error fetching player name:', error);
            return 'Unknown';
        }
    }, [playerNames]);

    useEffect(() => {
        if (selectedMatch) {
            [selectedMatch.winner, selectedMatch.loser].forEach((player) => {
                getPlayerName(player);
            });
        }
    }, [selectedMatch, getPlayerName]);

    const handleWinnerChange = (value) => {
        setWinner(value);

        if (selectedMatch) {
            if (value === selectedMatch.winner) {
                setLoser(selectedMatch.loser);
                setScores(`${selectedMatch.wscores} / ${selectedMatch.lscores}`);
            } else if (value === selectedMatch.loser) {
                setLoser(selectedMatch.winner);
                setScores(`${selectedMatch.lscores} / ${selectedMatch.wscores}`);
            }
        }
    };

    const handleMatchChange = (matchId) => {
        const match = latestFinals.find((m) => m.$id === matchId);
        setSelectedMatch(match);
        if (match) {
            setWinner(match.winner);
            setLoser(match.loser);
            setScores(`${match.wscores} / ${match.lscores}`);
        }
    };

    const submitHandler = useCallback(async () => {
        try {
            if (!selectedMatch || !selectedMatch.matchid) {
                console.error("selectedMatch is null or $id is missing");
                return; // Exit early if the data is invalid
            }
            const matchId = selectedMatch?.matchid;
            const res = await DatabaseService.finalResult(winner, loser, scores, matchId);
            if(res){
                setAlert(res)
                setTimeout(() => {
                    navigate('/admin/manageFinalWinner')
                }, 1000);
            }

        } catch (error) {
            console.log(error);
        }
    }, [selectedMatch, winner, loser, scores]);

    const headersProps = ['#', 'winner', 'wscores', 'loser', 'lscores', 'date']

    useEffect(() => {
        if (latestFinals.length > 0) {
            const getFinal = latestFinals.map((final) => ({
                '#': final.$id.slice(0, 4),
                winner: playerNames[final.winner] || 'Loading...',
                loser: playerNames[final.loser] || 'Loading...',
                wscores: final.wscores,
                lscores: final.lscores,
                date: new Date(final.date).toLocaleDateString(),
            }));
            setOneFinal(getFinal);
        }
    }, [latestFinals, playerNames]);


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
            <h1 className="px-2">Add Final Winner</h1>
            <div className="my-10 boxShadow p-5">
                <form className="p-2 rounded"
                    onSubmit={(e) => {
                        e.preventDefault(),
                            submitHandler()
                    }}
                >
                    <div className='flex justify-between flex-col md:flex-row items-center gap-5'>
                        {/* Match Selection */}
                        <div className="w-full mb-4">
                            <label htmlFor="match">Select Match</label> <br />
                            <select
                                id="match"
                                value={selectedMatch?.$id || ''}
                                onChange={(e) => handleMatchChange(e.target.value)}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                {latestFinals.map((match) => (
                                    <option key={match.$id} value={match.$id}>
                                        Match # {match.$id.slice(0, 4)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Scores Display */}
                        <div className="w-full mb-4">
                            <label htmlFor="scores">Scores</label> <br />
                            <input
                                id="scores"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={scores}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='flex justify-between flex-col md:flex-row items-center gap-5'>
                        {/* Winner Selection */}
                        <div className="w-full mb-4">
                            <label htmlFor="winner">Select Winner</label> <br />
                            <select
                                id="winner"
                                value={winner}
                                onChange={(e) => handleWinnerChange(e.target.value)}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                {selectedMatch &&
                                    [selectedMatch.winner, selectedMatch.loser].map((player, index) => (
                                        <option key={index} value={player}>
                                            {playerNames[player] || 'Loading...'}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/* Loser Display */}
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

                    <Button title={'Add Winner'} />
                </form>
            </div>
            <div className="my-5">
                <Table headers={headersProps} data={oneFinal} />
            </div>
        </div>
    );
};

export default React.memo(AddFinalWinner);
