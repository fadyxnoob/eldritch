import Config from "../Config/Config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    account;

    databases;
    storage;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProID);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createAccount({ email, password, name, userName, image }, navigate, setError) {
        try {
            // Check if the username already exists
            const existingUser = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUsersColl,
                [Query.equal('userName', userName)]
            );

            if (existingUser.total > 0) {
                navigate('/login')
                setError('Username already exists. Please choose a different one.')
                return;
            }

            // Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // Upload the image if provided
            if (!image) {
                await this.account.delete(userAccount.$id);
                setError('No image file provided.');
                return;
            }

            const fileId = ID.unique();
            const uploadResponse = await this.storage.createFile(Config.appWriteBucketID, fileId, image);

            // Insert user document data into the database
            const documentData = {
                id: userAccount.$id,
                userName,
                image: uploadResponse.$id,
            };

            await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteUsersColl,
                ID.unique(),
                documentData
            );

            const socialDocument = {
                userID: userAccount.$id,
            };

            // Insert into second collection with error handling
            try {
                await this.databases.createDocument(
                    Config.appWriteDBID,
                    Config.appWriteUserSocialColl,
                    ID.unique(),
                    socialDocument
                );
            } catch (error) {
                console.error("Error inserting social document:", error.response || error.message);
                // You may want to re-throw the error or handle it differently if needed
            }

            navigate('/login')
        } catch (error) {
            setError('Auth Creating Account ERROR :: ', error);
            return
        }
    }

    async login({ email, password }, setLoginError) {

        try {
            // await this.deleteSession();
            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                setLoginError("Login successful");
                return session;
            } else {
                setLoginError("Failed to create login session.");
                return;
            }
        } catch (error) {
            setLoginError(`Login User ERROR :: ${error.message}`);
            console.error('Error during login:', error);
            throw error;
        }

    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.warn("Unauthorized: No active session. Please log in again.");
            } else {
                console.error("An error occurred while fetching user data:", error);
            }
            throw error;
        }
    };

    async logout() {
        try {
            await this.account.deleteSession('current');
            console.log("User logged out successfully");
        } catch (error) {
            console.log('Logout ERROR ::', error);
        }
    }

    async deleteSession() {
        try {
            // 'current' specifies that the current active session will be deleted
            await this.account.deleteSession('current');
            console.log('Session deleted successfully');
        } catch (error) {
            console.error('Failed to delete session:', error);
            throw error;
        }
    }


    viewUserImage(fileId) {
        return this.storage.getFilePreview(
            Config.appWriteBucketID,
            fileId
        );
    }

    async updateUser(userName = null, email = null, currentPassword = null, image = null, id, navigate) {
        try {
            if (userName) {
                await this.account.updateName(userName);
            } else {
                throw new Error("Invalid name. Name cannot be empty.");
            }

            if (email && currentPassword) {
                await this.account.updateEmail(email, currentPassword);
            }

            if (image) {
                const response = await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteUsersColl,
                    [Query.equal('id', id)]
                );

                if (response.documents.length > 0) {
                    const firstDocument = response.documents[0];
                    const imageId = firstDocument.image;
                    const fileId = ID.unique();

                    // Upload new image
                    const uploadResponse = await this.storage.createFile(
                        Config.appWriteBucketID,
                        fileId,
                        image
                    );

                    if (uploadResponse) {
                        // Delete old image if exists
                        if (imageId) {
                            await this.storage.deleteFile(Config.appWriteBucketID, imageId);
                        }

                        // Update document with new image ID
                        await this.databases.updateDocument(
                            Config.appWriteDBID,
                            Config.appWriteUsersColl,
                            firstDocument.$id,
                            { image: fileId }
                        );
                    }
                }
            }

            // Navigate only after all updates are complete
            navigate('/myProfile');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    async getUserSocial(userID) {
        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUserSocialColl,
                [Query.equal('userID', userID)]
            )
        } catch (error) {
            console.log('Get User Social ERROR ::', error);
        }
    }

    async updateSocials(id, facebook, insta, youtube, twitter) {
        try {
            const response = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUserSocialColl,
                [Query.equal('userID', id)]
            );

            const document = response.documents[0];
            return await this.databases.updateDocument(
                Config.appWriteDBID,
                Config.appWriteUserSocialColl,
                document.$id,
                {
                    facebook: facebook,
                    instagram: insta,
                    youtube: youtube,
                    twitter: twitter
                }

            )
        } catch (error) {
            console.log('Update User Social ERROR ::', error);
        }
    }

    async registerCandidate({ id, userName, inGameName, inGameID }) {
        try {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
            const docID = ID.unique()
            await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteManageCandidates,
                docID,
                {
                    uname: userName,
                    ign_name: inGameName,
                    ig_id: inGameID,
                    date: formattedDate,
                    userID: id,
                }

            )
        } catch (error) {
            console.log('Register Candidate ERROR ::', error);
        }
    }

    async getCandidate(id) {
        if (!id) {
            console.log('Error: Missing user ID');
            return null;
        }

        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteManageCandidates,
                [Query.equal('userID', id)]
            );
        } catch (error) {
            console.log('ERROR getting Candidate ::', error);
        }
    }

    async getAllProducts(popular) {
        try {
            const data = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteProductCollID,
                [Query.equal('status', 'active', 'popular', popular)]
            )
            return data
        } catch (error) {
            console.log('All Products Fetching ERROR ::', error);
        }
    }

    async getSingleProduct(id) {
        try {
            if (!id) {
                console.log('id is not found');
            }
            return await this.databases.getDocument(
                Config.appWriteDBID,
                Config.appWriteProductCollID,
                id
            )
        } catch (error) {
            console.log('');
        }
    }

    async getAllCategories() {
        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteCatsCollID
            )
        } catch (error) {
            console.log('Getting All Categories ERROR ::', error);
        }
    }

    async getCategory(id) {
        try {
            if (!id) {
                console.log('Id miss hai bro');
            }
            return await this.databases.getDocument(
                Config.appWriteDBID,
                Config.appWriteCatsCollID,
                id
            )

        } catch (error) {
            console.log('Getting Category ERROR ::', error);

        }
    }

    async getProsByCat(id) {
        try {
            if(id){
                const data = await this.databases.listDocuments(
                    Config.appWriteDBID,
                    Config.appWriteProductCollID,
                    [Query.equal('cat', id)]
                );
                return data;
            }
            
        } catch (error) {
            console.log('Getting Pros by CatID ERROR ::', error);
        }
    }

    async getCatName(id){
        try {
            return await this.databases.getDocument(
                Config.appWriteDBID,
                Config.appWriteCatsCollID,
                String(id)          
            )
        } catch (error) {
            console.log('Getting Category Name ERROR ::', error);
        }
    }
    
}

const authService = new Service();
export default authService;