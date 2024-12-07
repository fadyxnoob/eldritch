import React, { useCallback, useEffect, useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import DatabaseService from '../../Admin/Appwrite/Database';
import Config from '../../Config/Config';

const FaqsPage = () => {
    const [faqsData, setFaqsData] = useState([]);
    const [collection] = useState(Config.appWriteManageFaqsCollID);
    const [openFaq, setOpenFaq] = useState(null); // Tracks the currently open FAQ

    const fetchDataFromDB = useCallback(async () => {
        try {
            const res = await DatabaseService.getAllDocuments(collection);
            setFaqsData(res.documents || []);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
        }
    }, [collection]);

    useEffect(() => {
        fetchDataFromDB();
    }, [fetchDataFromDB]);

    const handleFaqToggle = (faqId) => {
        setOpenFaq((prev) => (prev === faqId ? null : faqId));
    };

    return (
        <div>
            <div className='banner forgetBanner'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>FAQs</h1>
            </div>
            <div className="faq-container w-3/4 mx-auto boxShadow my-10">
                {faqsData.map((faq) => (
                    <div className='p-2 rounded' key={faq.$id}>
                        {/* FAQ Question */}
                        <div
                            className='flex items-center justify-between cursor-pointer px-5 py-3 transition-all'
                            onClick={() => handleFaqToggle(faq.$id)}
                        >
                            <h1 className="text-xl font-semibold">{faq.question}</h1>
                            {openFaq === faq.$id ? (
                                <IoIosArrowDropupCircle size={24} className='text-primary' />
                            ) : (
                                <IoIosArrowDropdownCircle size={24} />
                            )}
                        </div>
                        {/* FAQ Answer */}
                        <div
                            className={`faq-answer overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
                                openFaq === faq.$id ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <p className="px-5 py-3 boxShadow border bg-primary text-light rounded">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(FaqsPage);
