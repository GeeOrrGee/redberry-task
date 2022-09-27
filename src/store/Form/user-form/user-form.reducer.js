import { formTypes } from '../form-global/globalForm.types';
import coworkerTypes from './user-form.types';

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
    positioinsCurrData: [],
    activeNames: defaultNames,
};

export const coworkerReducer = (state = defaultUserState, action) => {
    const { type, payload } = action;

    switch (type) {
        case coworkerTypes.SET_USER_OBJECT:
            return { ...state, userObject: payload };

        case coworkerTypes.SET_FORM_ERRORS:
            return { ...state, formErrors: payload };

        case coworkerTypes.SET_ACTIVE_TEAM_ID:
            return { ...state, activeTeamId: payload };

        case coworkerTypes.FETCH_USER_DATA_SUCCESS:
            return { ...state, fetchedData: payload };
        case coworkerTypes.FETCH_USER_DATA_FAIL:
            return { ...state, error: payload };

        case coworkerTypes.SET_CURR_TEAMS_DATA:
            return { ...state, teamsCurrData: payload };

        case coworkerTypes.SET_CURR_POSITIONS_DATA:
            return { ...state, positionsCurrData: payload };

        case coworkerTypes.SET_ACTIVE_NAMES:
            return {
                ...state,
                activeNames: { ...state.activeNames, ...payload },
            };
        case formTypes.SEND_POST_REQUEST:
            return defaultUserState;

        default:
            return state;
    }
};

export default coworkerReducer;
