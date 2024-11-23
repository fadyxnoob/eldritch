import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button/Button'
const ManageAdmins = () => {

    const headers = ["#", "Name", "Username", "Email", "Image", "Posts", "Update"]

    const data = [{
        "#": 1,
        Name: "Yasir",
        Username: "yasir123",
        Email: "yasir@yasir.com",
        Image: <img src={adminAvatar} alt="adminAvatar" className='size-12 object-cover' />,
        Posts: 12,
        Update: <button className='bg-primary px-2 py-1 text-light'>
            <Link to={'/admin/updateAdmin'}>
                Update
            </Link>
        </button>
    }]

    return (
        <div>
            <h1
                className='px-2'
            >Manage Admins</h1>
            <div className='flex justify-end'>
                <Button title={'Add Admin'} path={'/admin/addAdmin'} />
            </div>
            <div
                className='my-10'
            >
                <Table title='' filter={true} searchInput={true} headers={headers} data={data} />
            </div>
        </div>
    )
}

export default React.memo(ManageAdmins)
