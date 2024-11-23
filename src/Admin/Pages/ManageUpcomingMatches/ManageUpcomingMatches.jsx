import React from 'react'
import Table from '../../Components/Table/Table'

const ManageUpcomingMatches = () => {
    const headers = ['#', 'player 1', 'player 2', 'status', 'date']
    const data = [{
        '#': 1,
        'player 1': 'player 1',
        'player 2': 'player 2',
        status: <button>Active</button>,
        date: '22/09/2000'

    }]
    return (
        <div>
            <h1 className="px-2">Upcoming Matches</h1>

            <div className="my-10">
                <Table headers={headers} data={data} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageUpcomingMatches)
