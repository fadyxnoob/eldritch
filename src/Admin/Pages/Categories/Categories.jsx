import React from 'react'
import Table from '../../Components/Table/Table'
import Button from '../../Components/Button/Button'

const Categories = () => {
    const headers = {
        '#': '#',
        'title': 'title',
        'type': 'type',
        'edit': 'Edit',
        'delete': 'Delete'
    }

    const data = [
        {
            "#": 1,
            title: "Introduction to React",
            type: "Article",
            edit: <button className="text-blue-500 hover:underline">Edit</button>,
            delete: <button className="text-red-500 hover:underline">Delete</button>
        },
        {
            "#": 2,
            title: "Understanding Redux",
            type: "Video",
            edit: <button className="text-blue-500 hover:underline">Edit</button>,
            delete: <button className="text-red-500 hover:underline">Delete</button>
        },
        {
            "#": 3,
            title: "Tailwind CSS Guide",
            type: "Tutorial",
            edit: <button className="text-blue-500 hover:underline">Edit</button>,
            delete: <button className="text-red-500 hover:underline">Delete</button>
        },
        {
            "#": 4,
            title: "JavaScript Best Practices",
            type: "Article",
            edit: <button className="text-blue-500 hover:underline">Edit</button>,
            delete: <button className="text-red-500 hover:underline">Delete</button>
        },
        {
            "#": 5,
            title: "Node.js Basics",
            type: "Video",
            edit: <button className="text-blue-500 hover:underline">Edit</button>,
            delete: <button className="text-red-500 hover:underline">Delete</button>
        },
    ];


    return (
        <div className='w-full'>
            <h1 className='px-2'>Manage Categories</h1>
            <div className='text-end'>
                <Button title={'Add Category'} style='' />
            </div>
            <div className="border p-2 my-5">
                <Table title='' headers={headers} data={data} />
            </div>
        </div>
    )
}

export default Categories
