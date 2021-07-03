import { createSelector } from "reselect";
import { State, UserState } from '../store/types'

/**
 * stateを引数に受け取り、任意のStateの値を返却する関数
 * @param state 
 */
const userSelector = (state: State) => { return state.user };

/**
 * createSelectorは第一引数に配列の形で関数を受け取る。
 * 受け取る関数はStateを引数に持ちStateの値を返却する関数。
 * 第二引数に第一引数関数の戻り値から最終的な戻り値を指定する関数を記述する。
 */
export const getUserLoginState = createSelector(
    [userSelector],
    (user: UserState) => { return user.login }
);