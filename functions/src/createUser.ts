import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"

type UserTypingTexts = {
    uid: string,
    typingTexts: {
        id: number,
        originalText: string,
        kanaText: string
    }[]
}

export const createUser = functions.https.onCall((data, context) => {
    if (!admin.apps.length) {
        admin.initializeApp();
    }

    if (!context.auth) {
        return ({ code: 202, message: 'ログインされていません' });
    } else {
        const userTypingTexts: UserTypingTexts = {
            uid: context.auth.uid,
            typingTexts: []
        };

        const db = admin.firestore();

        db.collection('typingTexts').doc('typingTexts').set(userTypingTexts).then(() => {
            return ({ code: 202, message: 'ログインされていません' });
        }).catch(() => {
            return({code:202,message:'エラー'});
        })
    }





})