import React from 'react'
import Table from '../../Components/Table/Table'



const ManageUsers = () => {
    const headers = ["#", "name", "username", "email", "action", "image"]
    const data = [{
        "#" : 1,
        name : "user",
        username : 'user123',
        email : 'user@gmail.com',
        action : <button className='bg-green-600 px-2 py-1 text-light'>Active</button>
    }]

    return (
        <div>
            <h1 className="px-2">Manage Users</h1>

            <div className="my-10">
                <Table headers={headers} data={data} title='' filter={true} searchInput={true} />
            </div>
        </div>
    )
}

export default ManageUsers
