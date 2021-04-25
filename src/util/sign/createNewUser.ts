import { app } from '../../config/firebase'
import { login } from './login'
export const createNewUser = async (email: string, password: string) => {
    try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        await login(email, password)
        return true
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                alert('既にユーザー登録がされています。');
                break;
            case 'auth/weak-password':
                alert('パスワードが無効です。\n半角英数字6桁以上で登録してください。');
                break;
            default:
                alert('ユーザー登録ができませんでした。');
        }
        return false
    }
};