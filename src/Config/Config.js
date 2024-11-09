const Config = {
    appWriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDBID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteUsersColl : String(import.meta.env.VITE_APPWRITE_USER_COLLECTION),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteUserSocialColl : String(import.meta.env.VITE_APPWRITE_USER_SOCIAL_COLLECTION),
}
export default Config;