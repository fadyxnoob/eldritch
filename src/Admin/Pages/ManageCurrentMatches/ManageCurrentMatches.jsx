import React from 'react'
import Table from '../../Components/Table/Table'

const ManageCurrentMatches = () => {
    const headers = ['#', 'player 1', 'player 2', 'status'];
    const data = [{
        '#': 1,
        'player 1': 'amir123',
        'player 2': 'ali123',
        status: <button>Active</button>
    }]
    return (
        <div>
            <h1 className="px-2">Current Matches</h1>
            <div className="my-10">
                <Table headers={headers} data={data} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageCurrentMatches)
