import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"

export const createUser = functions.https.onCall((data,context)=>{
    if (!admin.apps.length) {
        admin.initializeApp();
    }
    const db = admin.firestore();

    

})