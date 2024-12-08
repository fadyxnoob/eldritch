import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Table from '../../Components/Table/Table';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import { Query, Client } from 'appwrite';
import ManageComments from '../ManageComments/ManageComments'
import ManageUsers from '../ManageUsers/ManageUsers';
import ManageUserContacts from '../ManageUserContacts/ManageUserContacts';

const Dashboard = () => {
  const client = new Client()
    .setEndpoint(Config.appWriteURL)
    .setProject(Config.appWriteProID);

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
    const unsubscribe = client.subscribe(
      `databases.${Config.appWriteDBID}.collections.${Config.appWriteCommentsCollID}.documents`,
      (response) => {
        console.log("Direct subscription response:", response);
  
        // Check if any event includes ".create" (for new documents)
        const isCreateEvent = response.events.some((event) =>
          event.endsWith(".create")
        );
  
        if (isCreateEvent) {
          console.log("Document created event detected!");
          setCounter((prev) => ({
            ...prev,
            newComments: prev.newComments + 1,
          }));
        }
      }
    );
  
    return () => unsubscribe();
  }, [client]);
  

  return (
    <>
      <div className="w-full">
        <h1 className="px-2">Dashboard</h1>
        <div className="flex gap-5">
          <div className="w-full">
            <Card
              title={'New Candidates'}
              counter={counter.newMembers}
              path="manageUsers"
            />
          </div>
          <div className="w-full">
            <Card title={'Pending Reports'} counter={'9'} path={''} />
          </div>
          <div className="w-full">
            <Card title={'Pending Orders'} counter={'90'} path={'pendingOrders'} />
          </div>
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
      <div>
        <ManageComments />
      </div>
      <div>
        <ManageUsers getCountersFromDB={getCountersFromDB} />
      </div>
      <div>
        <ManageUserContacts />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
