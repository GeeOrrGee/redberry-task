import { createAction } from '@reduxjs/toolkit';
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
    createAction(coworkerTypes.SET_ACTIVE_ID, teamId);

export const setActiveNames = (names) =>
    createAction(coworkerTypes.SET_ACTIVE_NAMES, names);

export const setFetchedData = (data) =>
    createAction(coworkerTypes.SET_FETCHED_DATA, data);
