import * as actionTypes from './types'
import initialState from '../store/initialState'
import { UserState } from '../store/types'


const userReducer = (state = initialState.user, action: actionTypes.Action): UserState => {
    switch (action.type) {

        case actionTypes.CHANGE_LOGIN:
            return {
                ...state,
                login: action.data
            }

        default:
            return state;
    }
}

export default userReducer;

