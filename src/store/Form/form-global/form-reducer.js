import { formTypes } from './form.types';
const defaultState = {
    sentData: false,
    mainObject: {},
    loadingState: false,
};

export const formGlobalReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case formTypes.SET_MAIN_OBJECT:
            return {
                ...state,
                mainObject: { ...state.mainObject, ...payload },
            };
        case formTypes.SEND_POST_REQUEST:
            return { ...state, loadingState: true };
        case formTypes.POST_REQUEST_SUCCESS:
            return { ...state, loadingState: false, sentData: true };
        case formTypes.POST_REQUEST_FAIL:
            return { ...state, loadingState: false, error: payload };

        // case formTypes.SET_LAPTOP_INFO:
        //     return { ...state, user: laptop(state.laptop, payload) };
        default:
            return state;
    }
};
