import axios from 'axios';
import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import {
    onUserFetchFail,
    onUserFetchSuccess,
    setCurrentPositionsData,
    setCurrentTeamsData,
} from './user-form.actions';
import { selectActiveTeamId, selectFetchedData } from './user-form.selectors';
import coworkerTypes from './user-form.types';

export function* fetchPositionsData(action) {
    try {
        const {
            data: { data },
        } = yield axios(action.payload); //url
        // console.log(data);
        const activeTeamId = yield select(selectActiveTeamId);
        const fetchedData = yield select(selectFetchedData);
        yield put(
            onUserFetchSuccess({
                ...fetchedData,
                positions: data,
            })
        );
        const modifiedPositions = !activeTeamId
            ? data
            : data.filter((obj) => obj.team_id === activeTeamId);
        yield put(setCurrentPositionsData(modifiedPositions));
    } catch (err) {
        yield put(onUserFetchFail(err));
    }
}
export function* fetchTeamsData(action) {
    try {
        const {
            data: { data },
        } = yield axios(action.payload);
        const fetchedData = yield select(selectFetchedData);
        console.log(fetchedData);
        yield put(
            onUserFetchSuccess({
                ...fetchedData,
                teams: data,
            })
        );
        yield put(setCurrentTeamsData(data));
    } catch (err) {
        yield put(onUserFetchFail(err));
    }
}

export function* onTeamsDropdown() {
    yield takeLatest(coworkerTypes.FETCH_USER_DATA_TEAMS_START, fetchTeamsData);
}
export function* onPositionsDropdown() {
    yield takeLatest(
        coworkerTypes.FETCH_USER_DATA_POSITIONS_START,
        fetchPositionsData
    );
}

export function* userFormSaga() {
    yield all([call(onPositionsDropdown), call(onTeamsDropdown)]);
}
