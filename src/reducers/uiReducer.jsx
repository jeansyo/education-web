import { types } from "../utils/types"

const initialState = {
    loading: false,
    checking: false,
}

export const uiReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        case types.uiStartChecking:
            return {
                ...state,
                checking: true
            }

        case types.uiFinishChecking:
            return {
                ...state,
                checking: false
            }
        
        default:
            return state;
    }

}