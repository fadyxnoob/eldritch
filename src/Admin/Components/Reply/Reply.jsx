import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { FaXmark } from "react-icons/fa6";
import Config from '../../../Config/Config';
import { Query } from "appwrite";
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert'

const Reply = ({ docID, user, message, isOpen, close }) => {
    const [userName, setUserName] = useState("Guest");
    const [reply, setReply] = useState('')
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userColl = Config.appWriteUsersColl;
                const params = [Query.equal("id", user)];
                const userNameRes = await DatabaseService.getAllDocuments(userColl, params);

                setUserName(userNameRes.documents[0]?.userName || "Guest");
            } catch (error) {
                console.error("Error fetching username:", error);
                setUserName("Guest");
            }
        };

        if (user) fetchUserName();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(docID);
        if (!reply) {
            setAlert({
                type: 'warning',
                message: 'Input field is empty'
            })
            return;
        };
        const collection = Config.appWriteCommentsCollID;
        const updateData = { 'reply': reply };
        const res = await DatabaseService.updateDocument(collection, docID, updateData)
        if (res.type === 'success') {
            setAlert({ type: 'success', message: 'Reply has been sent.' })
            setTimeout(() => {
                close()
            }, 1000);
            return;
        } else {
            setAlert(res)
            return;
        }


    }
    if (!isOpen) return null;
    return (
        <div className="w-screen h-screen border mx-auto fixed top-0 left-0 bg-[#000000e7] z-50">
            {
                alert && <Alert
                    type={alert.type}
                    message={alert.message}
                />
            }
            <form
                onSubmit={handleSubmit}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full md:w-1/2 h-1/3 bg-light">
                    {/* Header */}
                    <div className="border flex justify-between">
                        <h1 className="text-black text-xl p-1">Reply to: {userName}</h1>
                        <FaXmark
                            className="text-primary size-8 cursor-pointer"
                            title="Close Reply"
                            onClick={close}
                        />
                    </div>

                    {/* Input and Button */}
                    <div className="w-full flex items-center justify-center">
                        <div className="w-full p-5">
                            <label htmlFor="Title" className="text-black">
                                For: {message}
                            </label>
                            <br />
                            <input
                                id="Title"
                                type="text"
                                className="placeholder:text-black text-black mt-2 w-full bg-primary focus:border-b-2 outline-none border-primary h-10 px-2"
                                placeholder="Reply here"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <Button title={"Reply"} style={"px-5 my-2 py-[5px] rounded"} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default React.memo(Reply);
