import React, { useCallback, useEffect, useState } from 'react';
import service from '../../Appwrite/Conf';
import { format } from "date-fns";
import { FaDeleteLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Comments = ({ comments, post, setAlert, onDelete }) => {
    const [usernames, setUsernames] = useState({});
    const userData = useSelector((state) => state.auth.userdata);

    const getUserName = useCallback(async (id) => {
        if (usernames[id]) return;
        try {
            const res = await service.getUserName(id);
            setUsernames((prev) => ({ ...prev, [id]: res?.documents['0']?.userName || 'guest' }));
        } catch (error) {
            console.error(`Error fetching username for ID ${id}:`, error);
            setUsernames((prev) => ({ ...prev, [id]: 'Guest' }));
        }
    }, [usernames]);

    useEffect(() => {
        comments.forEach((comment) => {
            if (comment.userID) {
                getUserName(comment.userID);
            }
        });
    }, [comments, getUserName]);

    const deleteHandler = useCallback(async (commentID) => {
        const res = await service.deleteComment(commentID)
        console.log({ res });
        setAlert(res)
        onDelete
    }, [comments])

    return (
        <>
            <h1>({Array.isArray(comments) ? comments.length : 0}) comments for ( {post.title || post.name || 'N/A'} )</h1>

            {comments.map((comment, id) => (
                <React.Fragment key={id}>
                    <div className="border p-5 rounded-sm flex justify-between w-full mt-2">
                        <div>
                            {/* Display fetched username or a fallback */}
                            <strong>{usernames[comment.userID] || 'Loading...'}</strong>
                            <p className='text-sm mt-2'>
                                {comment.message || 'User comment'}
                            </p>
                            {comment.reply && (
                                <div className='mt-2 text-xs text-primary'>
                                    <strong>Reply by admin:</strong> {comment.reply}
                                </div>
                            )}
                        </div>
                        <div className='text-end'>
                            {
                                userData?.$id === comment?.userID ? (
                                    <FaDeleteLeft
                                        onClick={() => deleteHandler(comment?.$id)}
                                        className='text-red-600 size-8 ms-auto cursor-pointer'
                                    />
                                ) : (null)
                            }

                            {format(new Date(comment.date), "PPpp") || '02/08/2010'}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </>
    );
};

export default React.memo(Comments);
