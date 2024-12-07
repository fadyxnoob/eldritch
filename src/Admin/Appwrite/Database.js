import Config from "../../Config/Config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

class AppWriteDatabase {
    client = new Client();
    account;
    databases;
    storage;


    constructor() {
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProID);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);

    }

    subscribeToCollection(collectionId, callback) {
        console.log({collectionId});
        console.log({callback});
        try {
            const subscription = this.client.subscribe(`collections.${collectionId}.documents`, callback);
            console.log({subscription});
            return () => {
                // Unsubscribe when the component unmounts
                subscription();
            };
        } catch (error) {
            console.error('Subscription error:', error);  // Log any error for debugging
        }
    }

    // GET ALL DOCUMENTS FOR DIFFERENT COLLECTIONS 
    async getAllDocuments(collID, queryParams) {
        try {
            if (!queryParams) {
                return await this.databases.listDocuments(
                    Config.appWriteDBID,
                    collID
                );
            }
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                collID,
                queryParams
            );
        } catch (error) {
            console.log('Getting Docs for different Colls ERROR', error);
        }
    }

    //  Get all candidates or with the specific status
    async getAllCandidates(status = null) {
        try {
            if (!status) {
                return await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteManageCandidates
                );
            } else {
                return await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteManageCandidates,
                    [Query.equal('status', status)]
                );
            }
        } catch (error) {
            console.error('All Candidates ERROR ::', error);
            throw error; // Optional: Re-throw the error if needed.
        }
    }

    // Update any document with multiple attributes
    async updateDocument(collID, docID, updateData) {
        try {
            await this.databases.updateDocument(
                Config.appWriteDBID,
                collID,
                docID,
                updateData
            );

            return { type: 'success', message: `Document Has been Updated` }
        } catch (error) {
            console.log('Document updation Error ::', error);
            return { type: 'error', message: 'No document updated' }
        }
    }

    // Add a match 
    async addMatch(p1, p2, d) {
        try {
            const docID = ID.unique();
            return await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteManageMatchesCollID,
                docID,
                {
                    player1: p1,
                    player2: p2,
                    date: d,
                }
            );
        } catch (error) {
            console.log('Add Match ERROR ::', error);
        }
    }

    async getMatches(equal = null, notEqual = null) {
        try {
            if (equal && !notEqual) {
                return await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteManageMatchesCollID,
                    [Query.equal('status', equal)]
                )
            }

            if (notEqual && !equal) {
                return await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteManageMatchesCollID,
                    [Query.notEqual('status', notEqual)]
                )
            }

        } catch (error) {
            console.log('Getting Matches ERROR ::', error);
        }
    }

    async getDocument(docID, collection) {
        try {
            return await this.databases.getDocument(
                Config.appWriteDBID,
                collection,
                docID
            )
        } catch (error) {
            console.log('Getting Document ERROR ::', docID, 'in', collection, error.message);
        }
    }

    async getLastMatch(limit = 1) {
        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteManageMatchesCollID,
                [Query.limit(limit)]
            )
        } catch (error) {
            console.log('Get Last Match err ::', error);
        }
    }

    async addLastMatchResult(winner, loser, wscores, lscores, final, matchid) {
        try {
            // Fetch existing documents
            const data = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteMatchesResultsCollID
            );

            // Check if the result already exists
            const exists = data.documents.some(
                (doc) =>
                    (doc.winner === winner && doc.loser === loser) ||
                    (doc.winner === loser && doc.loser === winner)
            );

            if (!exists) {
                const docID = ID.unique();
                const date = new Date().toLocaleString();
                // Create the document if it doesn't exist
                await this.databases.createDocument(
                    Config.appWriteDBID,
                    Config.appWriteMatchesResultsCollID,
                    docID,
                    {
                        winner,
                        loser,
                        wscores,
                        lscores,
                        final,
                        matchid,
                        date,
                    }
                );

                await this.updateDocument(
                    Config.appWriteManageCandidates,
                    winner,
                    { 'status': 'Winner' }
                )
                await this.updateDocument(
                    Config.appWriteManageCandidates,
                    loser,
                    { 'status': 'Out' }
                )

                await this.updateDocument(
                    Config.appWriteMatchesResultsCollID,
                    matchid,
                    { 'status': 'clear' }
                )
                return { type: 'success', message: 'Match result added successfully!' };
            } else {
                return { type: 'error', message: 'This result already exists.' };
            }
        } catch (error) {
            console.error('Error in adding last result:', error);
            return { type: 'error', message: 'An error occurred while adding the result.' };
        }
    }

    async finalResult(winnerID, loserID, scores, matchID) {
        try {
            const date = new Date().toISOString();
            const docID = ID.unique()
            const res = await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteFinalWinnersCollID,
                docID,
                {
                    winner: winnerID,
                    loser: loserID,
                    scores: scores,
                    date: date,
                    matchId: matchID
                }
            )

            if (res) {
                const collID = Config.appWriteManageCandidates
                const matchColID = Config.appWriteManageMatchesCollID
                const updateWinner = { 'status': 'FinalWon' }
                const updateLoser = { 'status': 'FinalLoss' }
                const updateMatch = { 'status': 'Clear' }
                await this.updateDocument(collID, winnerID, updateWinner)
                await this.updateDocument(collID, loserID, updateLoser)
                await this.updateDocument(matchColID, matchID, updateMatch)
            }
            return { type: 'success', message: 'Document Added' };
        } catch (error) {
            console.log(error);
            return { type: 'error', message: 'Failed to add document' };
        }
    }

    async getPollMatchesResults() {
        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteMatchesResultsCollID,
                [Query.equal('final', 'false')]
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDocument(collID, docID, fileID = null) {
        try {
            const res = await this.databases.deleteDocument(
                Config.appWriteDBID,
                collID,
                docID
            )

            if (fileID && res) {
                await this.deleteFile(fileID)
            }
            return { type: 'warning', message: 'Document deleted.' }
        } catch (error) {
            console.log('Delete Doc error ::', error);
            return { type: 'error', message: 'Document deletion failed.' }
        }
    }

    async addDocument(collection, data, image) {
        try {
            const docID = ID.unique()
            const createdDocument = await this.databases.createDocument(
                Config.appWriteDBID,
                collection,
                docID,
                data
            );

            if (!createdDocument) {
                throw new Error('Failed to create the document.');
            }

            if (image) {
                const imageId = this.uploadFile(image);

                await this.databases.updateDocument(
                    Config.appWriteDBID,
                    collection,
                    createdDocument.$id,
                    { imageId }
                );
            }

            return { type: 'success', message: image ? 'Document with image added successfully.' : 'Document added successfully.' };
        } catch (error) {
            console.error('Error adding document:', error);
            return { type: 'error', message: error.message || 'Failed to add document.' };
        }
    }

    uploadFile(fileId, file) {
        try {
            return this.storage.createFile(
                Config.appWriteBucketID,
                fileId,
                file
            );

        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    ViewImage(fileId) {
        return this.storage.getFilePreview(
            Config.appWriteBucketID,
            fileId
        )
    }

    async deleteFile(fileID) {
        try {
            const response = await this.storage.deleteFile(Config.appWriteBucketID, fileID);
            return response;
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    };


}

const DatabaseService = new AppWriteDatabase();
export default DatabaseService;
