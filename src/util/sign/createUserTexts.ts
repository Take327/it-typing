import { app } from '../../config/firebase'


export const createUserTexts = async (uid: string) => {
    try {
        const db = app.firestore();
        console.log(uid);
        const document = db.collection('userTexts').doc(uid);
        await document.set({ typingTexts: [{ id: 1, originalText: '', kanaText: '' }] });
        return true;
    } catch (error) {
        return false;
    }
}
