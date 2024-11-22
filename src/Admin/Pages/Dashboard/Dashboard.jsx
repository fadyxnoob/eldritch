import React from 'react';
import Card from '../../Components/Card/Card';
import Table from '../../Components/Table/Table';
const Dashboard = () => {
  return (
    <>
      <div className='w-full'>
        <h1 className='px-2'>Dashboard</h1>
        <div className='flex gap-5'>
          <div className="w-full">
            <Card title={'New Candidates'} counter={'99+'} />
          </div>
          <div className="w-full">
            <Card title={'Pending Reports'} counter={'9'} />
          </div>
          <div className="w-full">
            <Card title={'Pending Orders'} counter={'90'} />
          </div>
          <div className="w-full">
            <Card title={'New Comments'} counter={'99+'} />
          </div>
        </div>
      </div>
      <div>
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
