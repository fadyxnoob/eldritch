import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'

const MyTeam = () => {

    const headers = ['#', 'name', 'about', 'role', 'image', 'update', 'delete']
    const data = [{
        '#':1,
        name:'Usmaan',
        about:'100 World Top Ranker',
        role:'Content Creator',
        image:<img src={adminAvatar} alt="adminAvatar" className='size-12 object-cover rounded-lg' />,
        update: <button>Update</button>,
        delete: <button>Delete</button>
    }]
  return (
    <div>
      <h1 className="px-2">Manage Team</h1>
      <div className="py-10">
        <Table filter={true} searchInput={true} headers={headers} data={data} />
      </div>
    </div>
  )
}

export default React.memo(MyTeam)
