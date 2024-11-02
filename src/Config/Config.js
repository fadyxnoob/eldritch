const Config = {
    appWriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDBID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default Config;