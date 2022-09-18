import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchLaptopFormDataFail,
    fetchLaptopFormDataSuccess,
} from './laptop-form.actions';
import { laptopInfoTypes } from './laptop-form.types';

export function* fetchLaptopFormData({ payload }) {
    try {
        const { url, dataKey, fieldName } = payload;
        const {
            data: { data },
        } = yield axios(url);
        const modifiedData = data.map((dataObj) => ({ ...dataObj, fieldName }));
        yield put(fetchLaptopFormDataSuccess({ [dataKey]: modifiedData }));
    } catch (err) {
        yield put(fetchLaptopFormDataFail(err));
    }
}

export function* onFormLaptopsFetchStart() {
    yield takeLatest(
        laptopInfoTypes.FETCH_LAPTOP_DATA_START,
        fetchLaptopFormData
    );
}

export function* laptopFormSagas() {
    yield all([call(onFormLaptopsFetchStart)]);
}
