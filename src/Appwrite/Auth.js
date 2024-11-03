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
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createAccount({ email, password, name, userName, image }, navigate) {
        try {
            // Check if the username already exists
            const existingUser = await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUsersColl,
                [Query.equal('userName', userName)]
            );

            if (existingUser.total > 0) {
                throw new Error('Username already exists. Please choose a different one.');
            }

            // Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // Upload the image if provided
            if (!image) {
                await this.account.delete(userAccount.$id); // Delete the user if no image is provided
                throw new Error('No image file provided.');
            }

            const fileId = ID.unique();
            const uploadResponse = await this.storage.createFile(Config.appWriteBucketID, fileId, image);

            // Insert user document data into the database
            const documentData = {
                userID: userAccount.$id,
                userName,
                image: uploadResponse.$id,
            };

            await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteUsersColl,
                ID.unique(),
                documentData
            );

            // Log the user in to create a session
            await this.login({ email, password });
            // navigate('/login');
        } catch (error) {
            console.error('Creating account in Appwrite ERROR :: ', error);
            throw error;
        }
    }
   
}

const authService = new Service();
export default authService;
