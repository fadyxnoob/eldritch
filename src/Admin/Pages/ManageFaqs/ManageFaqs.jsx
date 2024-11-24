import React from 'react'
import Table from '../../Components/Table/Table'
import adminAvatar from '../../../assets/images/Candidates/Candi1.jpg'

const ManageFaqs = () => {
    const headers = ['#', 'question', 'answer', 'update', 'delete']
    const data = [{
        '#': 1,
        question: 'What is the Abbrevation of PUBG?',
        answer: 'Players Unknown Battle Ground.',
        update: <button>Update</button>,
        delete: <button>Delete</button>
    }]
    return (
        <div>
            <h1 className="px-2">Manage Faqs</h1>
            <div className="py-10">
                <Table filter={true} searchInput={true} headers={headers} data={data} />
            </div>
        </div>
    )
}

export default React.memo(ManageFaqs)
