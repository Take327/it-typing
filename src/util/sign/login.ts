import { app } from '../../config/firebase'

export const login = async (email: string, password: string) => {
    try {
        await app.auth().signInWithEmailAndPassword(email, password);
        return true
    } catch (error) {
        return false
    }
};