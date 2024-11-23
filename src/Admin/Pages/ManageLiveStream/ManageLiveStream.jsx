import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'
const ManageLiveStream = () => {

    const headers = ['#', 'link', 'status', 'edit', 'thumbnail']
    const data = [{
        '#': 1,
        link: <a
        className='underline text-blue-600'
        href='https://www.youtube.com/watch?v=NtaM3Sj-zow' target='_blank'>https://www.youtube.com/watch?v=NtaM3Sj-zow</a>,
        status: <button className='bg-green-600 px-2 py-1 text-light'>Active</button>,
        edit: <button className='bg-green-600 px-5 py-1 text-light'>Edit</button>,
        thumbnail: <img src={adminAvatar} alt="adminAvatar" className='w-full h-[200px] object-cover rounded-lg' />,
    }]
    return (
        <div>
            <h1 className="px-2">Manage Live Stream</h1>
            <div className="py-10">
                <Table headers={headers} data={data} />
            </div>
        </div>
    )
}

export default React.memo(ManageLiveStream)
