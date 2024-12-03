import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import Alert from '../../../Components/Alert/Alert'
import DatabaseService from '../../Appwrite/Database'
import { useNavigate } from 'react-router-dom'

const AddFaq = () => {
    const [alert, setAlert] = useState(null)
    const [collection] = useState(String('674ecd470023465bee73'))
    const [faqData, setFaqData] = useState({ question: '', answer: '' })
    const navigate = useNavigate();

    const submitHandler = async () => {
        let addData = {
            answer: faqData.answer,
            question: faqData.question,
        };

        try {
            const res = await DatabaseService.addDocument(collection, addData);
            setAlert({ type: 'success', message: 'New FAQ added successfully!' });
            setTimeout(() => {
                navigate('/admin/manageFaqs');
                setAlert(null);
            }, 1000);
        } catch (error) {
            console.error('Error adding document:', error);
            setAlert({ type: 'error', message: 'Failed to add FAQ' });
        }
    };


    return (
        <>
            {alert && <Alert message={alert.message} type={alert.type} />}
            <h1 className='px-2'>Add New Faqs</h1>
            <div className='boxShadow my-10 p-5'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            submitHandler()
                    }}
                >
                    <div className='flex justify-between items-center gap-5 md:flex-row flex-col'>
                        <div className='w-full'>
                            <label htmlFor="Question">Question</label> <br />
                            <input
                                id='Question'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={faqData.question}
                                onChange={(e) => setFaqData((prev) => ({ ...prev, question: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Answer">Answer</label> <br />
                            <input
                                id='Answer'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={faqData.answer}
                                onChange={(e) => setFaqData((prev) => ({ ...prev, answer: e.target.value }))}
                            />
                        </div>
                    </div>
                    <Button title={'Add'} style={'mt-5 px-5'} />
                </form>
            </div>
        </>
    )
}
export default React.memo(AddFaq)
