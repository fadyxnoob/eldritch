import Config from "../Config/Config";
import { Client, Account, ID } from "appwrite";


export class Service {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Config.appWriteURL)
        .setProject(Config.appWriteProID);
        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){
        try {
          const userAccount =  await this.account.create(ID.unique(), email, password, name);
          if (userAccount) {
            //  if user exist call another method 
            return  this.login({email, password})
                
          }else{
            return userAccount;
          }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return this.account.get();
        }catch (error){
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Loguot ERROR ::', error);
        }
    }

    
}
const authService = new Service();

export default authService;