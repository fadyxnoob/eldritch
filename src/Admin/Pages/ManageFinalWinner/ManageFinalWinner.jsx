import React from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'


const ManageFinalWinner = () => {
    const headers = ['#', 'winner', 'loser', 'scores', 'date', 'edit', 'delete']
    const data = [{
        '#':1,
        'winner': 'Hunter24',
        'loser' : 'levelU2',
        'scores' : '25 / 22	',
        'date' : '07 Nov 2023',
        'edit' : <button>Edit</button>,
        'delete' : <button>Delete</button>
    }]

    return (
        <div>
            <h1 className="px-2">Manage Final Winners</h1>
            <div className='text-end'>
                <Button title={'add Winner'}/>
            </div>
            <div className="my-10">
                <Table headers={headers} data={data} searchInput={true} filter={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageFinalWinner)
