const Config = {
    appWriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDBID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteUsersColl : String(import.meta.env.VITE_APPWRITE_USER_COLLECTION),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteUserSocialColl : String(import.meta.env.VITE_APPWRITE_USER_SOCIAL_COLLECTION),
    appWriteManageCandidates : String(import.meta.env.VITE_APPWRITE_MANAGE_CANDIDATE_COLLECTION),
    appWriteProductCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_PRODUCTS_COLLECTION_ID),
    appWritePostsCollID : String(import.meta.VITE_APPWRITE_MANAGE_POSTS_COLLECTION_ID),
    appWriteCatsCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_CATEGORIES_COLLECTION_ID),
}
export default Config;