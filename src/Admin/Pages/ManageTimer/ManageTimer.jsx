import React, { useCallback, useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import DatabaseService from "../../Appwrite/Database";
import Alert from "../../../Components/Alert/Alert";
import Config from "../../../Config/Config";

const ManageTimer = () => {
    const [collection] = useState(Config.appWriteManageTimerCollID);
    const [documentID] = useState("674eda5100217e08f20e");
    const [alert, setAlert] = useState(null);
    const [pageData, setPageData] = useState({
        title: "",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [timerEndTime, setTimerEndTime] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);

    // Fetch data from the database
    const fetchDataFromDB = useCallback(async () => {
        try {
            const res = await DatabaseService.getDocument(documentID, collection);
            if (res) {
                const endTime = res.endTime ? new Date(res.endTime).getTime() : null;
                setPageData({
                    title: res.title,
                    days: res.days,
                    hours: res.hours,
                    minutes: res.minutes,
                    seconds: res.seconds,
                });
                setTimerEndTime(endTime);
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            setAlert({ type: "error", message: "Failed to fetch data from database." });
        }
    }, [collection, documentID]);

    // Update the timer settings in the database
    const updateTimerInDB = useCallback(async (updatedData) => {
        try {
            const updatedDocument = {
                ...updatedData,
                endTime: updatedData.endTime,
            };
            await DatabaseService.updateDocument(collection, documentID, updatedDocument);
            setAlert({ type: "success", message: "Timer updated successfully!" });
            return true;
        } catch (error) {
            console.error("Error updating timer in database:", error);
            setAlert({ type: "error", message: "Failed to update timer." });
        }
    }, [collection, documentID]);

    // Calculate remaining time based on the timer's end time
    const calculateTimeRemaining = useCallback(() => {
        if (!timerEndTime) return null;
        const now = new Date().getTime();
        const diff = timerEndTime - now;
        if (diff <= 0) return null;
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }, [timerEndTime]);

    // Start the countdown
    useEffect(() => {
        if (timerEndTime) {
            const interval = setInterval(() => {
                const remaining = calculateTimeRemaining();
                if (!remaining) {
                    clearInterval(interval);
                    setTimeRemaining(null);
                } else {
                    setTimeRemaining(remaining);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerEndTime, calculateTimeRemaining]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const now = new Date().getTime();
            const duration =
                pageData.days * 24 * 60 * 60 * 1000 +
                pageData.hours * 60 * 60 * 1000 +
                pageData.minutes * 60 * 1000 +
                pageData.seconds * 1000;
            const endTime = new Date(now + duration).toISOString();

            const updatedData = {
                ...pageData,
                endTime,
            };

            try {
                const res = await updateTimerInDB(updatedData);
                if (res) {
                    setPageData(updatedData);
                    setTimerEndTime(new Date(endTime).getTime());
                }
            } catch (error) {
                console.error("Error updating timer: ", error);
            }
        },
        [pageData, updateTimerInDB]
    );

    useEffect(() => {
        fetchDataFromDB();
    }, [fetchDataFromDB]);

    return (
        <div>
            <h1 className="px-2">Manage Event Timer</h1>
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="my-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold">
                                Title:
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={pageData.title}
                                onChange={(e) =>
                                    setPageData((prev) => ({ ...prev, title: e.target.value }))
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                                <label className="block text-gray-700 font-bold">Days:</label>
                                <input
                                    type="number"
                                    className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                    min={0}
                                    value={pageData.days}
                                    onChange={(e) =>
                                        setPageData((prev) => ({
                                            ...prev,
                                            days: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Hours:</label>
                                <input
                                    type="number"
                                    className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                    min={0}
                                    max={24}
                                    value={pageData.hours}
                                    onChange={(e) =>
                                        setPageData((prev) => ({
                                            ...prev,
                                            hours: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Minutes:</label>
                                <input
                                    type="number"
                                    className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                    min={0}
                                    max={60}
                                    value={pageData.minutes}
                                    onChange={(e) =>
                                        setPageData((prev) => ({
                                            ...prev,
                                            minutes: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Seconds:</label>
                                <input
                                    type="number"
                                    className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                    min={0}
                                    max={60}
                                    value={pageData.seconds}
                                    onChange={(e) =>
                                        setPageData((prev) => ({
                                            ...prev,
                                            seconds: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <Button
                            style="bg-primary text-white py-2 px-6 rounded-md"
                            title="Update Timer"
                        />
                    </div>
                </form>
                {timeRemaining && (
                    <div className="mt-10">
                        <h2>Time Remaining:</h2>
                        <p>
                            {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
                            {timeRemaining.seconds}s
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ManageTimer);
