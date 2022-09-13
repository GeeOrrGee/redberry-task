import { combineReducers } from '@reduxjs/toolkit';
import { formTypes } from './form-global/form.types';
import coworkerReducer from './user-form/user-form.reducer';
const defaultUserObject = {
    name: '',
    surname: '',
    team_id: 0,
    position_id: 0,
    email: '',
    phone_number: '',
};

const defaultData = {
    teams: [],
    positions: [],
};

const defaultNames = {
    positions: 'პოზიციები',
    teams: 'თიმი',
};

export const defaultUserState = {
    userObject: defaultUserObject,
    formErrors: [],
    activeTeamId: 0,
    fetchedData: defaultData,
    teamsCurrData: [],
    positionsCurrData: [],
    activeNames: defaultNames,
};

const defaultState = {
    sentData: false,
    mainObject: {},
    loadingState: false,
    user: defaultUserState,
    laptop: {},
};

export const formReducer = (state = defaultState, action = {}) => {
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
