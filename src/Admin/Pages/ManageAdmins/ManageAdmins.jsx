import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database'
import adminService from '../../Appwrite/Auth'
import Config from '../../../Config/Config'


const ManageAdmins = () => {

    const [allAdmins, setAllAdmins] = useState([])
    const headers = ["#", "Name", "Email", "Image", "Posts", "Update"]

    const getAllAdmins = useCallback(async () => {
    }, [allAdmins])

    useEffect(() => {
        getAllAdmins()
    }, []);
    const data = [{
        "#": 1,
        Name: "Yasir",
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
