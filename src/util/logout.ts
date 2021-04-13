import { app } from '../config/firebase'

export const logout = async () => {

    try {
        await app.auth().signOut();
        return true

    } catch (error) {
        return false;
    }

}
