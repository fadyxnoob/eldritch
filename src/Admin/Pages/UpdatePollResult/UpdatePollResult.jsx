import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../../Components/Alert/Alert';
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';

const UpdatePollResult = () => {
    const [lastCandidates, setLastCandidates] = useState({});
    const [winner, setWinner] = useState(lastCandidates);
    const [loser, setLoser] = useState('');
    const [winnerScores, setWinnerScore] = useState('0');
    const [loserScores, setLoserScore] = useState('0');
    const [final, setFinal] = useState('false');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const { matchID } = useParams();

    const getLastMatch = useCallback(async () => {
        try {
            const resultCollection = Config.appWriteMatchesResultsCollID 
            const matchResponse = await DatabaseService.getDocument(matchID, resultCollection);
            // Ensure matchResponse exists
            if (!matchResponse) {
                console.error("Error: matchResponse is undefined or null.");
                return;
            }

            setWinnerScore(matchResponse?.wscores)
            setLoserScore(matchResponse?.lscores)
            setFinal(matchResponse?.final)
            setWinner(matchResponse?.winner)
            setLoser(matchResponse?.loser)

            // Fetch player details
            const collection = Config.appWriteManageCandidates
            const player1 = await DatabaseService.getDocument(matchResponse?.winner, collection);
            const player2 = await DatabaseService.getDocument(matchResponse?.loser, collection);
            // Process and update match details
            const updatedMatch = {
                ...matchResponse,
                player1ID: matchResponse?.winner,
                player2ID: matchResponse?.loser,
                player1Name: player1?.uname || "Unknown",
                player2Name: player2?.uname || "Unknown",
            };

            setLastCandidates(updatedMatch);
        } catch (error) {
            console.error('Error fetching last match:', error);
        }
    }, []);

    useEffect(() => {
        getLastMatch(1);
    }, [getLastMatch]);

    const handleWinnerChange = useCallback(
        (id) => {
            if (id !== loser) {
                setWinner(id);
            }
        },
        [loser]
    );

    const handleLoserChange = useCallback(
        (id) => {
            if (id !== winner) {
                setLoser(id);
            }
        },
        [winner]
    );

    const submitHandler = useCallback(async () => {
        try {
            // Submit the data
            const CollID = Config.appWriteMatchesResultsCollID
            const updateData = {}
            if (winner) updateData.winner = winner;
            if (loser) updateData.loser = loser;
            if (winnerScores) updateData.wscores = winnerScores;
            if (loserScores) updateData.lscores = loserScores;
            if (final) updateData.final = final;

            const response = await DatabaseService.updateDocument(CollID, matchID, updateData);

            // Show alert based on response
            setAlert(response);

            // Navigate if the submission was successful
            if (response.type !== 'error') {
                setTimeout(() => {
                    navigate('/admin/pollMatches');
                }, 1000);
            }
        } catch (error) {
            // Handle unexpected errors
            setAlert({ type: 'error', message: 'An error occurred. Please try again.' });
            console.error(error);
        }
    }, [winner, loser, winnerScores, loserScores, final, lastCandidates]);



    const closeAlert = () => setAlert(null);


    return (
        <div>

            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                />
            )}

            <h1 className="px-2">Update Match Results</h1>
            <div className="my-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}
                    className="boxShadow p-5"
                >
                    <div className="flex justify-between items-center gap-5 md:flex-row flex-col">
                        {/* Winner Dropdown */}
                        <div className="w-full">
                            <label htmlFor="winner">Select Winner</label> <br />
                            <select
                                id="winner"
                                value={winner}
                                onChange={(e) => handleWinnerChange(e.target.value)}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                <option value="">
                                    Select Winner
                                </option>
                                <React.Fragment key={lastCandidates.$id}>
                                    <option value={lastCandidates.player1ID}>
                                        {lastCandidates.player1Name}
                                    </option>
                                    <option value={lastCandidates.player2ID}>
                                        {lastCandidates.player2Name}
                                    </option>
                                </React.Fragment>
                            </select>
                        </div>

                        {/* Loser Dropdown */}
                        <div className="w-full">
                            <label htmlFor="loser">Select Loser</label> <br />
                            <select
                                id="loser"
                                value={loser}
                                onChange={(e) => handleLoserChange(e.target.value)}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                <option value="">
                                    Select Loser
                                </option>
                                <React.Fragment key={`${lastCandidates.$id}-loser`}>
                                    <option value={lastCandidates.player1ID}>
                                        {lastCandidates.player1Name}
                                    </option>
                                    <option value={lastCandidates.player2ID}>
                                        {lastCandidates.player2Name}
                                    </option>
                                </React.Fragment>
                            </select>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between items-center gap-5 md:flex-row flex-col">
                        {/* Winner Scores */}
                        <div className="w-full">
                            <label htmlFor="winnerScore">Winner Scores</label> <br />
                            <input
                                id="winnerScore"
                                type="number"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={winnerScores}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    if (value >= 0 && value <= 40) {
                                        setWinnerScore(value.toString());
                                    }
                                }}
                                min={0}
                                max={40}
                            />
                        </div>

                        {/* Loser Scores */}
                        <div className="w-full">
                            <label htmlFor="loserScore">Loser Scores</label> <br />
                            <input
                                id="loserScore"
                                type="number"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={loserScores}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    if (value >= 0 && value <= 40) {
                                        setLoserScore(value.toString());
                                    }
                                }}

                                min={0}
                                max={40}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-end gap-5 md:flex-row flex-col">
                        {/* Final Selection */}
                        <div className="w-full mt-5">
                            <label htmlFor="final">Final</label> <br />
                            <select
                                id="final"
                                value={final}
                                onChange={(e) => setFinal(e.target.value)}
                                className="mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                <option value="false" className="h-10 p-2">
                                    No
                                </option>
                                <option value="true" className="h-10 p-2">
                                    Yes
                                </option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="w-full text-end">
                            <Button title="Update" style="px-6 py-1" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(UpdatePollResult)
