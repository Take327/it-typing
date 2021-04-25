import { app } from '../../config/firebase'

type UserTexts = {
    id: number,
    originalText: string,
    kanaText: string,
}[]


export const setUserTexts = async (userTexts: UserTexts) => {
    const uid = app.auth().currentUser?.uid
    if (uid) {
        const db = app.firestore();
        const document = db.collection('userTexts').doc(uid);
        try {
            await document.set({ typingTexts: userTexts });
            return true;
        } catch (error) {
            return false;
        }
    }
}