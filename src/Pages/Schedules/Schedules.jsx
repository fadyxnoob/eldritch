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
    const [matchData, setMatchData] = useState({});
    const [loading, setLoading] = useState(true);

    const getMatch = useCallback(async () => {
        const collection = Config.appWriteManageMatchesCollID;
        const params = [Query.equal('status', 'approved')];
        try {
            const res = await DatabaseService.getAllDocuments(collection, params);
            if (res?.documents?.length > 0) {
                setMatchData(res.documents[0]);
            }
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    }, []);

    const getPlayerData = useCallback(async () => {
        if (matchData.player1 && matchData.player2) {
            try {
                const player1Name = await getUserNameFromDB(matchData.player1);
                const player1Image = await getUserImageFromDB(matchData.player1);

                const player2Name = await getUserNameFromDB(matchData.player2);
                const player2Image = await getUserImageFromDB(matchData.player2);

                setPlayerData({
                    player1Name,
                    player1Image,
                    player2Name,
                    player2Image,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching player data:", error);
            }
        }
    }, [matchData]);

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
        const imageRes = await DatabaseService.getAllDocuments(userCollection, queryParams);
        const getThisImage = imageRes.documents[0]?.image;
        return DatabaseService.ViewImage(getThisImage);
    };

    useEffect(() => {
        getMatch();
    }, [getMatch]);

    useEffect(() => {
        getPlayerData();
    }, [getPlayerData]);

    if (loading) {
        return;
    }  
    
    return (
        <> 
            {loading ? (
                <p className="text-center my-5">Loading...</p>
            ) : ( 
                <>
                    <h1 className='text-center my-5 text-3xl'>Current Playing</h1>
                    <div className='mx-5 p-2 flex md:flex-row flex-col items-center justify-around gap-5 my-5 md:w-[60%] md:mx-auto'>
                        <div className='size-[300px]'>
                            <div className='flex justify-between my-2'>
                                <h2 className='text-center text-2xl m-0 p-0'>Player 1</h2>
                                <h3 className='text-center m-0 p-0'>{playerData.player1Name}</h3>
                            </div>
                            <img src={playerData.player1Image} alt="Player 1" className='size-full object-cover' />
                        </div>
                        <div className='size-[300px] md:mt-0 mt-10'>
                            <div className='flex justify-between my-2'>
                                <h2 className='text-center text-2xl m-0 p-0'>Player 2</h2>
                                <h3 className='text-center m-0 p-0'>{playerData.player2Name}</h3>
                            </div>
                            <img src={playerData.player2Image} alt="Player 2" className='size-full object-cover' />
                        </div>
                    </div>
                </>
            )}

            <div className="my-20 mx-5 md:w-[90%] md:mx-auto">
                <h4 className='text-center my-5 text-4xl font-semibold'>See Schedules Here</h4>
                <Tabs />
            </div>
        </>
    );
};

export default React.memo(Schedules);
