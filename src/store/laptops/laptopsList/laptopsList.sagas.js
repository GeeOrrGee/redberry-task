import axios from 'axios';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { fetchLaptopsError, fetchLaptopsSuccess } from './laptopsList.actions';
import { laptopsListTypes } from './laptopsList.types';

export function* fetchLaptops() {
    try {
        const {
            data: { data },
        } = yield call(
            axios,
            `https://pcfy.redberryinternship.ge/api/laptops?token=${'0f90a3c3ac54034b3e3675b2a4160ed7'}`
        );
        console.log(data);
        yield put(fetchLaptopsSuccess(data));
    } catch (err) {
        console.log(err.message);
        yield put(fetchLaptopsError(err));
    }
}
export function* onLaptopsFetchStart() {
    yield takeLatest(laptopsListTypes.FETCH_LAPTOPS_START, fetchLaptops);
}

export function* laptopsListSagas() {
    yield all([call(onLaptopsFetchStart)]);
}
