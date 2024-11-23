import React from 'react'
import Table from '../../Components/Table/Table'

const ManageCandidates = () => {
const headers = ['pl id', 'username', 'ig-name', 'ig-id', 'status', 'date', 'candy id']
const data = [{
    'pl id': 35,
    username: 'ali123',
    'ig-name': 'Legend007',
    'ig-id': '12121212121',
    status: <button>Active</button>,
    date: '02 Nov 2023' ,
    'candy id': 45
}]
    return (
        <div>
            <h1 className="px-2">Manage Candidates</h1>
            <div className="py-10">
                <Table data={data} headers={headers} searchInput={true} filter={true} />
            </div>
        </div>
    )
}

export default ManageCandidates
