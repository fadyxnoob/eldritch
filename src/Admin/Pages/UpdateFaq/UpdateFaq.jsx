import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Alert from '../../../Components/Alert/Alert';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

const UpdateFaq = () => {
    const [alert, setAlert] = useState(null);
    const { faqID } = useParams();
    const [faq, setFaq] = useState({ question: '', answer: '' });
    const [collection] = useState(Config.appWriteManageFaqsCollID)
    const navigate = useNavigate();

    const getFaq = useCallback(async () => {
        try {
            const res = await DatabaseService.getDocument(faqID, collection);
            setFaq({ question: res.question, answer: res.answer });

        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }, [faqID]);

    useEffect(() => {
        getFaq();
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const updatedData = {
            question: faq.question,
            answer: faq.answer,
        };

        const response = await DatabaseService.updateDocument(collection, faqID, updatedData);
        setAlert(response)
        setTimeout(() => {
            navigate('/admin/manageFaqs')
            setAlert(null)
        }, 1000);
    }, [faq])

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className="px-2">Update Faq</h1>
            <form
                onSubmit={handleSubmit}
                className="p-5 boxShadow mt-5"
            >
                <div className="">
                    <div className="w-full mb-3">
                        <label htmlFor="Question">Question</label> <br />
                        <input
                            id="Question"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setFaq((prev) => ({ ...prev, question: e.target.value }))}
                            value={faq.question || ''}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="Question">Question</label> <br />
                        <textarea
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-22 px-2"
                            onChange={(e) => setFaq((prev) => ({ ...prev, answer: e.target.value }))}
                            value={faq.answer || ''}
                            name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
                <Button title="Update" />
            </form>
        </div >
    );
};
export default React.memo(UpdateFaq)
