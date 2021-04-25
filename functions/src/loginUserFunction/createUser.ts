import * as functions from 'firebase-functions';
import * as admin from "firebase-admin"
/*
type UserTypingTexts = {
    uid: string,
    typingTexts: {
        id: number,
        originalText: string,
        kanaText: string
    }[]
}
*/

export const createUser = functions.https.onCall((data, context) => {
    if (!admin.apps.length) {
        admin.initializeApp();
    }

    return { data: data, auth: context.auth }

    /*
    if (!context.auth) {
        return ({ code: 401, message: 'ログインされていません' });
    } else {
        const userTypingTexts: UserTypingTexts = {
            uid: context.auth.uid,
            typingTexts: []
        };

        const db = admin.firestore();

        db.collection('typingTexts').doc('typingTexts').set(userTypingTexts).then(() => {
            return ({ code: 200, message: 'ユーザータイピングテキストを作成しました。' });
        }).catch(() => {
            return ({ code: 500, message: 'エラー' });
        })
    }
    */

});