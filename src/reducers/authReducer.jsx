import { types } from "../utils/types"

const initialState = {
    user: null,
}

export const authReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                user: action.payload  
            }

        case types.authLogout:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }

}