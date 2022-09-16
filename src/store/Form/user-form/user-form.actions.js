import createAction from '../../../utils/action-creator';
import coworkerTypes from './user-form.types';

export const setUserObject = (payload) =>
    createAction(coworkerTypes.SET_USER_OBJECT, payload);

export const setCurrentTeamsData = (teams) =>
    createAction(coworkerTypes.SET_CURR_TEAMS_DATA, teams);

export const setCurrentPositionsData = (positions) =>
    createAction(coworkerTypes.SET_CURR_POSITIONS_DATA, positions);

export const setFormErrors = (errors) =>
    createAction(coworkerTypes.SET_FORM_ERRORS, errors);

export const setActiveTeamId = (teamId) =>
    createAction(coworkerTypes.SET_ACTIVE_TEAM_ID, teamId);

export const setActiveNames = (names) =>
    createAction(coworkerTypes.SET_ACTIVE_NAMES, names);

// async

export const fetchPositionsStart = (url) =>
    createAction(coworkerTypes.FETCH_USER_DATA_POSITIONS_START, url);

export const fetchTeamsStart = (url) =>
    createAction(coworkerTypes.FETCH_USER_DATA_TEAMS_START, url);

export const onUserFetchSuccess = (dataMap) =>
    createAction(coworkerTypes.FETCH_USER_DATA_SUCCESS, dataMap);

export const onUserFetchFail = (err) =>
    createAction(coworkerTypes.FETCH_USER_DATA_FAIL, err);
