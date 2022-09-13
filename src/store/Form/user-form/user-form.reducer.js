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
    positionsCurrData: [],
    activeNames: defaultNames,
};

export const coworkerReducer = (state = defaultUserState, action) => {
    const { type, payload } = action;
    console.log(type);
    switch (type) {
        case coworkerTypes.SET_USER_OBJECT:
            return { ...state, userObject: payload };

        case coworkerTypes.SET_FORM_ERRORS:
            return { ...state, formErrors: payload };

        case coworkerTypes.SET_ACTIVE_TEAM_ID:
            return { ...state, activeTeamId: payload };

        case coworkerTypes.SET_FETCHED_DATA:
            return { ...state, fetchedData: payload };

        case coworkerTypes.SET_CURR_TEAMS_DATA:
            return { ...state, teamsCurrData: payload };

        case coworkerTypes.SET_CURR_POSITIONS_DATA:
            return { ...state, positionsCurrData: payload };

        case coworkerTypes.SET_ACTIVE_NAMES:
            return { ...state, activeNames: payload };

        // case coworkerTypes.REHYDRATE_STATE:
        //     return { ...payload };
        default:
            return state;
    }
};

export default coworkerReducer;
