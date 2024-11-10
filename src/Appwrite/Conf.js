import Config from "../Config/Config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class DBService {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Config.appWriteURL)
        .setProject(Config.appWriteProID);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async addProduct({title, price, status, popStatus, category, disc, image, userID}){
        try {
            return await this.databases.createDocument(
                Config.appWriteDBID,
                Config.appWriteCollID,
                ID.unique(),
                {
                    title,
                    price,
                    status,
                    popStatus,
                    category,
                    disc,
                    image,
                    userID,
                }
            )
        } catch (error) {
            console.log('Add Product ERROR ::', error);
        }
    }

    async updateProduct (id, {title, price, status, popStatus, category, disc, image}){
        try {
            return await this.databases.updateDocument(
                Config.appWriteDBID,
                Config.appWriteCollID,
                id,
                {
                    title, price, status, popStatus, category, disc, image
                }
            )
        } catch (error) {
            console.log('Update Product ERROR ::', error);
        }
    }

    async deleteProduct(id){
        try {
            await this.databases.deleteDocument(
                Config.appWriteDBID,
                Config.appWriteCollID,
                id
            )

            return true;
        }catch(error){
            console.log('Delete Product ERROR :: ', error);
            return false;
        }
    }

    async uploadImage(file){
        try {
            return await this.bucket.createFile(
                Config.appWriteBucketID,
                ID.unique(),
                file, 
            )
        } catch (error) {
            console.log('Product Image Uploading ERROR :: ', error);
        }
    }

    async deleteImage(fileId){
        try {
            await this.bucket.deleteFile(
                Config.appWriteBucketID,
                fileId
            )

            return true;
        } catch (error) {
            console.log('Product File Deletion Failed :: ', error);
        }
    }

    ViewImage(fileId){
        return this.bucket.getFilePreview(
            Config.appWriteBucketID,
            fileId
        )
    }

    async getUserDets(userID) {
        try {
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUsersColl,
                [Query.equal('id', userID)]
            );
        } catch (error) {
            console.log('UserDets ::', error);
        }
    }
     
    async getUserSocials(id){
        try{
            return await this.databases.listDocuments(
                Config.appWriteDBID,
                Config.appWriteUserSocialColl,
                [Query.equal('userID', id)]
            )
        }catch (error){
            console.log('User Socials ::', error);
        }
    }


}

const service = new DBService();
export default service;