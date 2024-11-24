import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'


const ManageProducts = () => {
    const headers = ['#', 'title', 'category','price', 'status', 'popular', 'image', 'update', 'delete']
    const data = [{
        '#': 1,
        title: 'K8A Magnatic Cooling Fan For Mobile & Ipad – CM Shope',
        category: 'Headphones',
        price: '12',
        status: 'Active',
        popular: 'NO',
        image: <img src={adminAvatar} alt="adminAvatar" className='size-12 object-cover rounded-lg' />,
        update: <button>Update</button>,
        delete: <button>Delete</button>
    }]

    return (
        <div>
            <h1 className="px-2">Manage Products</h1>
            <div className="py-10">
                <Table filter={true} searchInput={true} headers={headers} data={data} />
            </div>
        </div>
    )
}

export default React.memo(ManageProducts)
