import * as actionTypes from './types'
import initialState from '../store/initialState'
import { UserState } from '../store/type'


const textReducer = (state = initialState.user, action: actionTypes.Action): UserState => {
    switch (action.type) {

        case actionTypes.CHANGE_LOGIN:
            return state;

        default:
            return state;
    }
}

export default textReducer;

