import { combineReducers } from '@reduxjs/toolkit';
import { formTypes } from './form.types';
import coworkerReducer from './user-form/user-form.reducer';

const defaultState = {
    sentData: false,
    mainObject: {},
    loadingState: false,
    user: {},
    laptop: {},
};

export const formReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;
    console.log(state);
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
        case formTypes.SET_USER_INFO:
            return { ...state, user: coworkerReducer(state.user, action) };
        // case formTypes.SET_LAPTOP_INFO:
        //     return { ...state, user: laptop(state.laptop, payload) };
        default:
            return state;
    }
};
