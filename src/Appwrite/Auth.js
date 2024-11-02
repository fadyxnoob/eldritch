import Config from "../Config/Config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    account;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProID);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client);
    }

    async createAccount({ email, password, name, userName, image }, navigate) {
        try {
            // Step 1: Check if the username already exists
            const existingUser = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteCollID,
                [Query.equal('userName', userName)]
            );

            if (existingUser.total > 0) {
                throw new Error('Username already exists. Please choose a different one.');
            }

            // Step 2: Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // Step 3: Log the user in to create a session
            await loginUser(email, password); // Call the loginUser function here

            // Step 4: Attempt to upload the image
            if (!image) {
                await this.account.delete(userAccount.$id); // Delete the user if no image is provided
                throw new Error('No image file provided.');
            }

            const fileId = ID.unique();
            const uploadResponse = await this.storage.createFile(Config.appWriteBucketID, fileId, image);

            // Step 5: Prepare document data for database insertion
            const documentData = {
                userID: userAccount.$id,
                userName,
                image: uploadResponse.$id,
            };

            // Step 6: Attempt to create the document in the database
            await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteCollID,
                ID.unique(),
                documentData
            );

            // Step 7: Check if the user is already authenticated
            const session = await this.account.getSession('current');
            if (!session) {
                // If not authenticated, log in the user
                await loginUser(email, password);
            }

            // Redirect to login page if session exists
            navigate('/login'); // Adjust this URL to your login page
        } catch (error) {
            console.error('Creating account in Appwrite ERROR :: ', error);
            // Rollback: If any error occurs, attempt to delete the user account if it was created
            if (userAccount) {
                await this.account.delete(userAccount.$id); // Adjust according to your SDK
            }
            throw error;
        }
    }


    async deleteSession() {
        try {
            const session = await this.account.getSession('current');
            if (session) {
                await  this.account.deleteSession('current');
                console.log("Session deleted successfully");
            }
        } catch (error) {
            console.error("Failed to delete previous session:", error);
        }
    }


    async login({ email, password }) {
        try {
            await this.deleteSession();
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log('Failed to login User ERROR :: ', error);
            throw error;
        }
    }


    async loginUser(email, password) {
        try {
            await this.account.createSession(email, password);
            const session = await account.getSession('current');
            console.log("Session created:", session);
        } catch (error) {
            console.error("Login error:", error);
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async getUserStatus() {
        try {
            // Retrieve the logged-in user's account details
            const accountData = await this.account.get();

            // Check the user’s verification status
            const isVerified = accountData.emailVerification; // true if verified, false if not verified
            const userStatus = isVerified ? 'Verified' : 'Unverified';

            console.log(`User Status: ${userStatus}`);
            return userStatus;
        } catch (error) {
            console.error(`Failed to fetch user data: ${error}`);
        }
    }


    async logout() {
        try {
            // await this.account.deleteSessions()
        } catch (error) {
            console.log('Loguot ERROR ::', error);
        }
    }

    ViewUserImage(fileId) {
        return this.bucket.getFilePreview(
            Config.appWriteBucketID,
            fileId
        )
    }

}
const authService = new Service();

export default authService;