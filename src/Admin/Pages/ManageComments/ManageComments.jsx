import React from 'react'
import Table from '../../Components/Table/Table'

const ManageComments = () => {
    const headers = ['#', 'user', 'post', 'comment', 'date', 'delete']
    const data = [{
        '#':1,
        user:'hamza',
        post:'2',
        comment:'bohyt mehnga hai',
        date:'2023-11-08',
        delete: <button>Delete</button>
    }]
    return (
        <div>
            <h1 className="px-2">Manage Comments</h1>

            <div className="my-10">
                <Table headers={headers} data={data} filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default React.memo(ManageComments)
