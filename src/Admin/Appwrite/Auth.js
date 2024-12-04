import Config from "../../Config/Config";
import { Client, Account, Databases, Storage, ID } from "appwrite";

class Service {
    client;
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

    async adminLogin({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return { type: 'success', message: 'Login successful', data: session };
        } catch (error) {
            console.log('Admin Login ERROR ::', error);
            return { type: 'error', message: error.message };
        }
    }

    async getCurrentAdmin() {
        try {
            const admin = await this.account.get();
            return { type: 'success', message: 'Admin retrieved successfully', data: admin };
        } catch (error) {
            console.log('Admin get ERROR ::', error);
            return { type: 'error', message: error.message };
        }
    }

    async adminLogout() {
        try {
            await this.account.deleteSession('current');

            return { type: 'success', message: 'Logout successful' };
        } catch (error) {
            console.log('Admin Logout ERROR ::', error);
            return { type: 'error', message: error.message };
        }
    }

    async createAccount({ email, password, name }) {
        try {
            const userId = ID.unique()
            const res = await this.account.create(userId, email, password, name);
            if (res) {
                console.log({ res });
                const collection = '674ff9ce00290d166ce1';
                await this.databases.createDocument(
                    Config.appWriteDBID,
                    collection,
                    ID.unique(),
                    { image: '', adminID: res.$id }
                );
            }
            console.log({ res });
            return { type: 'success', message: 'Account created successfully' };
        } catch (error) {
            console.log('Admin Creation error ::', error);
            return { type: 'error', message: error.message };
        }
    }

}

const adminService = new Service();
export default adminService;
