import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'


const ManagePosts = () => {


   const headers = ['#', 'title', 'category', 'status', 'popular', 'image', 'date', 'update', 'delete']
    const data = [{
        '#':1,
        title:'Get Ready for Gaming Glory: Announcing the Next Tournamen',
        category:'Results',
        status:'Active',
        popular : 'NO',
        image:<img src={adminAvatar} alt="adminAvatar" className='size-12 object-cover rounded-lg' />,
        date : '12/20/2000',
        update: <button>Update</button>,
        delete: <button>Delete</button>
    }]
  return (
    <div>
      <h1 className="px-2">Manage Posts</h1>
      <div className="py-10">
        <Table filter={true} searchInput={true} headers={headers} data={data} />
      </div>
    </div>
  )
}


export default React.memo(ManagePosts)
