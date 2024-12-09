import React, { useState, useEffect, useCallback } from 'react';
import PlayerPlaceholder from '../../assets/images/Candi3.jpg';
import { Tabs } from '../../';
import DatabaseService from '../../Admin/Appwrite/Database';
import Config from '../../Config/Config';
import { Query } from 'appwrite';

const Schedules = () => {
    const [playerData, setPlayerData] = useState({
        player1Name: '',
        player1Image: PlayerPlaceholder,
        player2Name: '',
        player2Image: PlayerPlaceholder,
    });
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch match and player data together
    const fetchMatchAndPlayers = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch the approved match
            const collection = Config.appWriteManageMatchesCollID;
            const params = [Query.equal('status', 'approved')];
            const res = await DatabaseService.getAllDocuments(collection, params);

            if (res?.documents?.length > 0) {
                const match = res.documents[0];
                setMatchData(match);

                // Fetch player data in parallel
                const [player1, player2] = await Promise.all([
                    fetchPlayerData(match.player1),
                    fetchPlayerData(match.player2),
                ]);

                setPlayerData({
                    player1Name: player1.name,
                    player1Image: player1.image,
                    player2Name: player2.name,
                    player2Image: player2.image,
                });
            }
        } catch (error) {
            console.error("Error fetching match and player data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch individual player data
    const fetchPlayerData = async (playerId) => {
        try {
            const collection = Config.appWriteManageCandidates;
            const player = await DatabaseService.getDocument(playerId, collection);

            const queryParams = [Query.equal("id", player.userID)];
            const userCollection = Config.appWriteUsersColl;
            const userRes = await DatabaseService.getAllDocuments(userCollection, queryParams);

            return {
                name: player.uname,
                image: userRes.documents[0]?.image
                    ? DatabaseService.ViewImage(userRes.documents[0].image)
                    : PlayerPlaceholder,
            };
        } catch (error) {
            console.error(`Error fetching player data for ID: ${playerId}`, error);
            return { name: 'Unknown', image: PlayerPlaceholder };
        }
    };

    useEffect(() => {
        fetchMatchAndPlayers();
    }, [fetchMatchAndPlayers]);

    if (loading) {
        return <p className="text-center my-5">Loading...</p>;
    }

    return (
        <>
            <h1 className='text-center my-5 text-3xl'>Current Playing</h1>
            <div
             className='p-2 flex flex-col items-center justify-around gap-5 my-5 w-full mx-auto overflow-hidden sm:flex-row md:w-1/2'
             >
                <div className='singlePlayerCard rounded shadow'>
                    <div className='flex items-center rounded justify-between bg-primary p-2 text-light'>
                        <h2 className='text-center text-2xl m-0 p-0'>Player 1</h2>
                        <h3 className='text-center m-0 p-0'>{playerData.player1Name}</h3>
                    </div>
                    <div className='size-[300px] p-5 shadow-md shadow-primary'>

                        <img src={playerData.player1Image} alt="Player 1" className='size-full object-cover' />
                    </div>
                </div>

                <div className='singlePlayerCard rounded shadow'>
                    <div className='flex items-center  rounded justify-between bg-primary p-2 text-light'>
                        <h2 className='text-center text-2xl m-0 p-0'>Player 2</h2>
                        <h3 className='text-center m-0 p-0'>{playerData.player2Name}</h3>
                    </div>
                    <div className='size-[300px] sm:mt-0 mt-10 p-5 shadow-md shadow-primary'>

                        <img src={playerData.player2Image} alt="Player 2" className='size-full object-cover' />
                    </div>
                </div>

            </div>
            <div className="my-20 mx-5 sm:w-[90%] sm:mx-auto">
                <h4 className='text-center my-5 text-4xl font-semibold'>See Schedules Here</h4>
                <Tabs />
            </div>
        </>
    );
};

export default React.memo(Schedules);
