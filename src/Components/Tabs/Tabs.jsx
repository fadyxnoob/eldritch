import React, { useCallback, useEffect, useState } from 'react'
import VS from '../../assets/images/vs.png'
import Config from '../../Config/Config'
import DatabaseService from '../../Admin/Appwrite/Database'
import { Query } from 'appwrite'

const Tabs = () => {
    const [toggleTab, setToggleTab] = useState(1);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [currentPlayerData, setCurrentPlayerData] = useState({});
    const [upComingMatches, setUpComingMatches] = useState([]);
    const [upComingPlayersData, setUpComingPlayersData] = useState({})
    const [loading, setLoading] = useState(true);
    const [resultsMatches, setResultsMatches] = useState([])
    const [resultsPlayersData, setResultsPlayersData] = useState({})

    const handleToggle = (idx) => {
        setToggleTab(idx);
    };

    const getAllMatches = useCallback(async () => {
        setLoading(true);
        const resultsCollection = Config.appWriteMatchesResultsCollID;
        try {
            const currentRes = await DatabaseService.getMatches("approved");
            setCurrentMatches(currentRes.documents);

            const upComingRes = await DatabaseService.getMatches("pending");
            setUpComingMatches(upComingRes.documents);

            const resultsRes = await DatabaseService.getAllDocuments(resultsCollection)
            setResultsMatches(resultsRes.documents)
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    }, []);

    useEffect(() => {
        getAllMatches();
    }, [getAllMatches]);

    const getUserNameFromDB = async (id) => {
        const collection = Config.appWriteManageCandidates;
        const res = await DatabaseService.getDocument(id, collection);
        return res.uname;
    };

    const getUserImageFromDB = async (id) => {
        const collection = Config.appWriteManageCandidates;
        const res = await DatabaseService.getDocument(id, collection);
        const userID = res.userID;
        const queryParams = [Query.equal("id", userID)];
        const userCollection = Config.appWriteUsersColl;
        const image = await DatabaseService.getAllDocuments(userCollection, queryParams);
        const getThisImage = image.documents[0].image;
        return DatabaseService.ViewImage(getThisImage);
    };

    useEffect(() => {
        const fetchUpComingPlayerData = async () => {
            const data = {};
            for (const match of upComingMatches) {
                if (!data[match.player1]) {
                    data[match.player1] = {
                        name: await getUserNameFromDB(match.player1),
                        image: await getUserImageFromDB(match.player1),
                    };
                }
                if (!data[match.player2]) {
                    data[match.player2] = {
                        name: await getUserNameFromDB(match.player2),
                        image: await getUserImageFromDB(match.player2),
                    };
                }
            }
            setUpComingPlayersData(data);
        };

        const fetchCurrentPlayerData = async () => {
            const data = {};
            for (const match of currentMatches) {
                if (!data[match.player1]) {
                    data[match.player1] = {
                        name: await getUserNameFromDB(match.player1),
                        image: await getUserImageFromDB(match.player1),
                    };
                }
                if (!data[match.player2]) {
                    data[match.player2] = {
                        name: await getUserNameFromDB(match.player2),
                        image: await getUserImageFromDB(match.player2),
                    };
                }
            }
            setCurrentPlayerData(data);
        };

        const fetchResultsPlayerData = async () => {
            const data = {};
            for (const match of resultsMatches) {
                if (!data[match.winner]) {
                    data[match.winner] = {
                        name: await getUserNameFromDB(match.winner),
                        image: await getUserImageFromDB(match.winner),
                    };
                }
                if (!data[match.loser]) {
                    data[match.loser] = {
                        name: await getUserNameFromDB(match.loser),
                        image: await getUserImageFromDB(match.loser),
                    };
                }
            }
            setResultsPlayersData(data);
        };
        fetchCurrentPlayerData()
        fetchUpComingPlayerData();
        fetchResultsPlayerData();

        setLoading(false)
    }, [currentMatches, upComingMatches, resultsMatches]);

    return (
        <>
            <div className='flex justify-between items-center boxShadow flex-col sm:flex-row sm:h-12'>
                <div
                    onClick={() => handleToggle(1)}
                    className={`tabHeader ${toggleTab === 1 ? 'active' : 'text-black'} relative w-full sm:w-1/3 text-xl cursor-pointer h-full flex items-center justify-start p-2`}
                >
                    <h3>Next Matches</h3>
                </div>
                <div
                    onClick={() => handleToggle(2)}
                    className={`tabHeader ${toggleTab === 2 ? 'active' : 'text-black'} relative w-full sm:w-1/3 text-xl cursor-pointer h-full flex items-center justify-start p-2`}
                >
                    <h3>Upcoming Matches</h3>
                </div>
                <div
                    onClick={() => handleToggle(3)}
                    className={`tabHeader ${toggleTab === 3 ? 'active' : 'text-black'} relative w-full sm:w-1/3 text-xl cursor-pointer h-full flex items-center justify-start p-2`}
                >
                    <h3>Matches Results</h3>
                </div>
            </div>

            <div className='border'>

                {toggleTab === 1 && (
                    currentMatches.length > 0 ? (
                        currentMatches.map((match) => {
                            const player1 = currentPlayerData[match.player1] || {};
                            const player2 = currentPlayerData[match.player2] || {};
                            return (
                                <div
                                    className={`${toggleTab === 1 ? "block" : "hidden"} p-5 `}
                                    key={match.$id}
                                >
                                    <div className="flex justify-between items-center my-5 flex-col sm:flex-row">
                                        <div className="flex items-center w-full justify-around sm:w-1/2">
                                            {/* Player 1 */}
                                            <div>
                                                <img
                                                    src={player1?.image || "default-player1.png"}
                                                    alt={player1.name || "Player 1"}
                                                    className="size-24 object-cover shadow shadow-primary rounded"
                                                />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player1.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                            {/* VS */}
                                            <img src={VS} alt="VS" className="size-14 object-cover" />
                                            {/* Player 2 */}
                                            <div>
                                                <img
                                                    src={player2?.image || "default-player2.png"}
                                                    alt={player2.name || "Player 2"}
                                                    className="size-24 object-cover shadow shadow-primary rounded"
                                                />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player2.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                        </div>
                                        {/* Match Date */}
                                        <div className="flex items-center justify-center w-full flex-col bg-primary text-light mt-2 rounded sm:w-1/2 ">
                                            <h5 className="text-xl">Match Date</h5>
                                            <p>
                                                {match?.date
                                                    ? new Date(match?.date).toDateString()
                                                    : "Date Not Available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-lg mt-5">No data found for Next Matches</div>
                    ))
                }

                {/* UpComing Matches Tab */}
                {toggleTab === 2 && (
                    upComingMatches.length > 0 ? (
                        upComingMatches.map((match) => {
                            const player1 = upComingPlayersData[match.player1]
                            const player2 = upComingPlayersData[match.player2]
                            return (
                                <div className={`${toggleTab === 2 ? 'block' : 'hidden'} p-5`} key={match.$id}>

                                    <div className="flex justify-between items-center my-5 flex-col sm:flex-row">
                                        <div className="flex items-center w-full justify-around sm:w-1/2">
                                            <div>
                                                <img
                                                    src={player1?.image}
                                                    alt={player1?.name}
                                                    className='size-24 object-cover shadow shadow-primary rounded' />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player1?.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                            <img src={VS} alt={VS} className='size-14 object-cover' />
                                            <div>
                                                <img
                                                    src={player2?.image || "default-player2.png"}
                                                    alt={player2?.name || "Player 2"}
                                                    className="size-24 object-cover shadow shadow-primary rounded"
                                                />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player2?.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center w-full flex-col bg-primary text-light mt-2 rounded sm:w-1/2 ">
                                            <h5 className="text-xl">Match Date</h5>
                                            <p>
                                                {match?.date
                                                    ? new Date(match?.date).toDateString()
                                                    : "Date Not Available"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center text-lg mt-5">No data found for Upcoming Matches</div>
                    ))
                }

                {/* Matches Results */}
                {toggleTab === 3 && (
                    resultsMatches.length > 0 ? (
                        resultsMatches.map((match) => {
                            const player1 = resultsPlayersData[match.winner]
                            const player2 = resultsPlayersData[match.loser]

                            return (<div className={`${toggleTab === 3 ? 'block' : 'hidden'} p-5`} key={match.$id}>
                                  <div className="flex justify-between items-center my-5 flex-col sm:flex-row">
                                        <div className="flex items-center w-full justify-around sm:w-1/2">
                                            {/* Player 1 */}
                                            <div>
                                                <img
                                                    src={player1?.image || "default-player1.png"}
                                                    alt={player1?.name || "Player 1"}
                                                    className="size-24 object-cover shadow shadow-primary rounded"
                                                />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player1?.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                            {/* VS */}
                                            <img src={VS} alt="VS" className="size-14 object-cover" />
                                            {/* Player 2 */}
                                            <div>
                                                <img
                                                    src={player2?.image || "default-player2.png"}
                                                    alt={player2?.name || "Player 2"}
                                                    className="size-24 object-cover shadow shadow-primary rounded"
                                                />
                                                <h4 className="text-center text-lg mt-2 border bg-primary text-light rounded">
                                                    {player2?.name || "Unknown Player"}
                                                </h4>
                                            </div>
                                        </div>
                                        {/* Match Date */}
                                        <div className="flex items-center justify-center w-full flex-col bg-primary text-light mt-2 rounded sm:w-1/2 ">
                                            <h5 className="text-xl">Match Date</h5>
                                            <p>
                                                {match?.date
                                                    ? new Date(match?.date).toDateString()
                                                    : "Date Not Available"}
                                            </p>
                                        </div>
                                    </div>
                            </div>)
                        })
                    ) : (
                        <div className="text-center text-lg mt-5">No data found for Results Matches</div>
                    ))
                }

            </div>
        </>
    )
}

export default React.memo(Tabs)
