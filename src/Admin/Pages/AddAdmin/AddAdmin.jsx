import React, { useCallback, useState } from 'react'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../Components/Alert/Alert'
import adminService from '../../Appwrite/Auth'


const AddAdmin = () => {
    const [alert, setAlert] = useState(null);
    const [admin, setAdmin] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        console.log({ admin });
        if (!admin.name && !admin.email && !admin.password) {
            setAlert({ type: 'error', message: 'Please fill all the fields.' })
            return;
        }

        const res = await adminService.createAccount({ email: admin.email, password: admin.password, name: admin.name })
        if (res.type === 'success') {
            setAlert(res)
            setTimeout(() => {
                navigate('/admin/manageAdmins')
                setAlert(null)
            }, 1000);
        }else{
            setAlert(res)
        }
    }, [admin])

    return (
        <>
            {
                alert && <Alert type={alert.type} message={alert.message} />
            }
            <h1 className='px-2'>Add New Admin</h1>
            <div className='boxShadow my-10 p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center gap-5 md:flex-row flex-col'>
                        <div className='w-full'>
                            <label htmlFor="name">Name</label> <br />
                            <input
                                id='name'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={admin.name}
                                onChange={(e) => setAdmin((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="email"> Email</label> <br />
                            <input
                                id='email'
                                type="email"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={admin.email}
                                onChange={(e) => setAdmin((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password"> Password</label> <br />
                            <input
                                id='password'
                                type="password"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={admin.password}
                                onChange={(e) => setAdmin((prev) => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                    </div>
                    <Button title={'Add Admin'} style={'mt-5 px-5'} />
                </form>
            </div>
        </>
    )
}

export default AddAdmin
