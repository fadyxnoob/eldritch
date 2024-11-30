const Config = {

    appWriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDBID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteUsersColl : String(import.meta.env.VITE_APPWRITE_USER_COLLECTION),
    appWriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteUserSocialColl : String(import.meta.env.VITE_APPWRITE_USER_SOCIAL_COLLECTION),
    appWriteManageCandidates : String(import.meta.env.VITE_APPWRITE_MANAGE_CANDIDATE_COLLECTION),
    appWriteProductCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_PRODUCTS_COLLECTION_ID),
    appWritePostsCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_POSTS_COLLECTION_ID),
    appWriteCatsCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_CATEGORIES_COLLECTION_ID),
    appWriteUsersContactsCollID : String(import.meta.env.VITE_APPWRITE_USERS_CONTACTS_COLLECTION_ID),
    appWriteManageMatchesCollID : String(import.meta.env.VITE_APPWRITE_MANAGE_MATCHES_COLL_ID),
    appWriteMatchesResultsCollID : String(import.meta.env.VITE_APPWRITE_MATCHES_RESULTS_COLL_ID),
    appWriteFinalWinnersCollID : String(import.meta.env.VITE_APPWRITE_FINAL_WINNERS_COLL_ID),
    
}
export default Config;