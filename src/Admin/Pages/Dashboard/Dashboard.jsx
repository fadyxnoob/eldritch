import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Table from '../../Components/Table/Table';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import { Query } from 'appwrite';


const Dashboard = () => {
  
  const [counter, setCounter] = useState({
    newMembers: 0,
    newComments: 0,  
  });

  const getCountersFromDB = useCallback(async () => {
    const candiColl = Config.appWriteUsersColl;
    const params = [Query.equal('status', 'pending')];
    const memberRes = await DatabaseService.getAllDocuments(candiColl, params);

    setCounter((prev) => ({
      ...prev,
      newMembers: memberRes.total, 
    }));
  }, []);

  useEffect(() => {
    getCountersFromDB(); 
  }, [getCountersFromDB]);

  const handleResetCommentsCounter = async () => {
    setCounter((prev) => ({ ...prev, newComments: 0 }));
  };

  useEffect(() => {
    const unsubscribe = DatabaseService.subscribeToCollection(
      `${Config.appWriteDBID}.collections.${Config.appWriteCommentsCollID}.documents`,
      (response) => {
        console.log({ response });  
        if (response.events && response.events.includes('databases.*.collections.*.documents.create')) {
          setCounter((prev) => ({
            ...prev,
            newComments: (prev.newComments || 0) + 1,
          }));
        }
      }
    );

    return () => unsubscribe();
  }, []);  


  return (
    <>
      <div className='w-full'>
        <h1 className='px-2'>Dashboard</h1>
        <div className='flex gap-5'>
          <div className="w-full">
            <Card
              title={'New Candidates'}
              counter={counter.newMembers}
              path='manageUsers'
            />
          </div>
          <div className="w-full">
            <Card
              title={'Pending Reports'}
              counter={'9'}
              path={''}
            />
          </div>
          <div className="w-full">
            <Card
              title={'Pending Orders'}
              counter={'90'}
              path={'pendingOrders'}
            />
          </div>
          <div className="w-full">
            <div className="w-full">
              <Card
                title={'New Comments'}
                counter={counter.newComments}
                onClickHandler={handleResetCommentsCounter}
                path={'manageComments'}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
