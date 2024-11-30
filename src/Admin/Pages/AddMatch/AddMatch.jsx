import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from '../../../Components/Alert/Alert'

const AddMatch = () => {
    const [allowedPlayers, setAllowedPlayers] = useState([]);
    const [selectedPlayer1, setSelectedPlayer1] = useState('');
    const [selectedPlayer2, setSelectedPlayer2] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [alert, setAlert] = useState('')

    // Fetch active candidates
    const getActiveCandidates = useCallback(async () => {
        const data = await DatabaseService.getAllCandidates('Active');
        setAllowedPlayers(data.documents);
    }, []);

    useEffect(() => {
        getActiveCandidates();
    }, [getActiveCandidates]);

    // Log states whenever they change
    useEffect(() => {

    }, [selectedPlayer1, selectedPlayer2, startDate]);

    const handlePlayer1Change = (e) => {
        setSelectedPlayer1(e.target.value);
    };

    const handlePlayer2Change = (e) => {
        setSelectedPlayer2(e.target.value);
    };

    const handleOnSubmit = useCallback(async () => {
        const formattedDate = startDate.toISOString();
        const response = await DatabaseService.addMatch(selectedPlayer1, selectedPlayer2, formattedDate);
        if (response) {
            setAlert('Match has Been Arranged')
        }
    }, [selectedPlayer1, selectedPlayer2, startDate]);
    const onClose = () => {
        setAlert('')
    }
    return (
        <div>
            {
                alert && (<Alert message={alert} type='success' onClose={onClose} />)
            }
            <h1 className="px-2">Add Match</h1>
            <div className="boxShadow my-10 p-5">

                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            handleOnSubmit()
                    }}
                >
                    <div className="flex justify-between items-center gap-5 md:flex-row flex-col">

                        {/* Player 1 */}
                        <div className="w-full">
                            <label htmlFor="player1">Player 1</label> <br />
                            <select
                                id="player1"
                                value={selectedPlayer1}
                                onChange={handlePlayer1Change}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                <option value="" disabled>Select Player 1</option>
                                {allowedPlayers.map((player) => {
                                    const isDisabled = player.$id === selectedPlayer2;
                                    return (
                                        <option
                                            key={player.$id}
                                            value={player.$id}
                                            disabled={isDisabled}
                                            className={isDisabled ? 'text-gray-400' : ''}
                                        >
                                            {player.uname}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Player 2 */}
                        <div className="w-full">
                            <label htmlFor="player2">Player 2</label> <br />
                            <select
                                id="player2"
                                value={selectedPlayer2}
                                onChange={handlePlayer2Change}
                                className="cursor-text mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            >
                                <option value="" disabled>Select Player 2</option>
                                {allowedPlayers.map((player) => {
                                    const isDisabled = player.$id === selectedPlayer1;
                                    return (
                                        <option
                                            key={player.$id}
                                            value={player.$id}
                                            disabled={isDisabled}
                                            className={isDisabled ? 'text-gray-400' : ''}
                                        >
                                            {player.uname}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="my-5">
                        <label htmlFor="date">Date</label> <br />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="bg-[#e8f0fe] py-2 px-5 w-full focus:border-b-2 border-primary outline-none cursor-pointer"
                            placeholderText="Select a date"
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>

                    <div>
                        <Button
                            title={'Add Match'} style={'mt-5 px-5'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(AddMatch);
