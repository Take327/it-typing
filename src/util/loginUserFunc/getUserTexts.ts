import { app } from '../../config/firebase'

type UserTexts = {
    id: number,
    originalText: string,
    kanaText: string,
}[]


export const getUserTexts = async () => {
    const uid = app.auth().currentUser?.uid
    const db = app.firestore();
    const document = db.collection('userTexts').doc(uid);
    const doc = await document.get();
    if (!doc.exists) {
        console.log('データ無し')
    } else {
        const data = doc.data();
        if (data && uid) {
            const result: UserTexts = data.typingTexts
            return result;
        }
    }
}