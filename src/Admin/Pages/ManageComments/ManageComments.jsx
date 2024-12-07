import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../Components/Table/Table'
import Config from '../../../Config/Config'
import DatabaseService from '../../Appwrite/Database'
import { Query } from 'appwrite'
import Reply from '../../Components/Reply/Reply';

const ManageComments = () => {
    const [data, setData] = useState([])
    const [collection] = useState(Config.appWriteCommentsCollID)
    const [selectedComment, setSelectedComment] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    const headers = ['#', 'user', 'type', 'item', 'comment', 'date', 'reply', 'delete']
    const mapping = {
        '$id': "#",
        'userID': 'user',
        'documentID': 'item',
        'message': 'comment',
        'date': 'date',
        'docType': 'type'
    }

    const getDocumentName = async (id, type) => {
        if (type === 'post') {
            const collection = Config.appWritePostsCollID;
            const res = await DatabaseService.getDocument(id, collection)
            return res.title
        } else {
            const collection = Config.appWriteProductCollID;
            const res = await DatabaseService.getDocument(id, collection)
            return res.name
        }
    }

    const openReplyModal = (docID, userID, message) => {
        setSelectedComment({ docID, userID, message });
        setIsReplyOpen(true);
    };



    const fetchComments = useCallback(async () => {
        const res = await DatabaseService.getAllDocuments(collection);
        const modifiedRes = await Promise.all(
            res.documents.map(async (comment) => {
                const processedComment = {};

                Object.keys(mapping).forEach((key) => {
                    processedComment[mapping[key]] = comment[key] || 'N/A';
                });

                processedComment['#'] = comment.$id.split('').reverse('').slice(0, 4).join('');
                processedComment['date'] = new Date(comment.date).toLocaleDateString();

                const userColl = Config.appWriteUsersColl;
                const params = [Query.equal('id', comment.userID)];
                const userNameRes = await DatabaseService.getAllDocuments(userColl, params);
                processedComment['user'] = userNameRes.documents[0]?.userName || 'Unknown';
                processedComment['item'] = await getDocumentName(comment.documentID, comment.docType);
                processedComment['comment'] = (
                    <>
                        <div>{comment.message}</div>
                        {comment.reply && (
                            <div className="reply">
                                <strong>Reply:</strong> {comment.reply}
                            </div>
                        )}
                    </>
                );
                processedComment['reply'] =
                    <button
                        onClick={() => openReplyModal(comment.$id, comment.userID, comment.message)}
                        className='bg-red-500 rounded text-light px-2 py-1'
                    >
                        Reply
                    </button>;

                return processedComment;
            })
        );

        setData(modifiedRes);
    }, [collection]);

    useEffect(() => {
        fetchComments()
    }, [data])

    
    const closeReplyModal = () => {
        setSelectedComment(null);
        setIsReplyOpen(false);
        fetchComments()
    };
    return (
        <div>
            <h1 className="px-2">Manage Comments</h1>

            <div className="my-10">
                <Table headers={headers} data={data} filter={true} searchInput={true} />
            </div>
            {isReplyOpen && selectedComment && (
                <Reply
                    docID={selectedComment.docID}
                    user={selectedComment.userID}
                    message={selectedComment.message}
                    isOpen={isReplyOpen}
                    close={closeReplyModal}
                />
            )}
        </div>
    )
}

export default React.memo(ManageComments)
