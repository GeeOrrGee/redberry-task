import { FormTypes } from './form.types';

const defaultState = {
    sentData: false,
    mainObject: {},
    loadingState: false,
};

export const formReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case FormTypes.SET_MAIN_OBJECT:
            return { ...state, mainObject: payload };
        case FormTypes.SEND_POST_REQUEST:
            return { ...state, loadingState: true };
        case FormTypes.POST_REQUEST_SUCCESS:
            return { ...state, loadingState: false, sentData: true };
        case FormTypes.POST_REQUEST_FAIL:
            return { ...state, loadingState: false, error: payload };
        default:
            return state;
    }
};
