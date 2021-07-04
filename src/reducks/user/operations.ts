import { changeLoginAction } from './actions'
import { Dispatch } from 'redux'
import { app } from '../../config/firebase'

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await app.auth().signInWithEmailAndPassword(email, password);
            dispatch(changeLoginAction(true))
            alert('ようこそ');
        } catch (error) {
            alert('メールアドレス、またはパスワードが異なります。');
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch) => {
        try {
            await app.auth().signOut();
            dispatch(changeLoginAction(false))
            alert('ログアウトしました。')
        } catch (error) {
            alert('ログアウトに失敗しました。')
        }
    }
}

