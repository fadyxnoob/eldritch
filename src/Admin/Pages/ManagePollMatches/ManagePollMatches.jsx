import React from 'react'
import Table from '../../Components/Table/Table'

const ManagePollMatches = () => {
    const headers = ['#', 'player 1', 'player 2', 'winner', 'scores', 'date', 'edit', 'delete']

    const data = [{
        '#' : 1,
        'player 1' : 'gamemasterX7',
        'player 2' : 'pixelwarrior99',
        winner : 'gamemasterX7',
        scores : '35/30',
        date : '03 Nov 2023',
        edit : <button>Edit</button>,
        delete : <button>Delete</button>
    }]

    
    return (
        <div>
            <h1 className="px-2">Match's Results</h1>
            <div className="my-10">
                <Table headers={headers} data={data} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default ManagePollMatches
