import * as actionType from './types'

export const changeLoginAction = (login: boolean) => {
    return {
        type: actionType.CHANGE_LOGIN,
        data: login
    }
}