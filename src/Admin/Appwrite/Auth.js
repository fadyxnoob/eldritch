import Config from "../../Config/Config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

import class Service {
    client = new Client();
    account;

    databases;
    storage;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(Config.appWriteURL)
            .setProject(Config.appWriteProID)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async adminLogin({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                return session;
            }
            return false
        } catch (error) {
            console.log('Admin Login ERROR ::', error);

        }
    }

    async getCurrentAdmin() {
        try {
            const admin = await this.account.get();
            return admin
        } catch (error) {
            console.log('Admin get ERROR ::', error);

        }
    }

    async adminLogout() {
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log('Admin Logout ERROR ::', error);

        }
    }
}

const adminService = new Service();
export default adminService;