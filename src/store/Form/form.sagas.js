import { takeLatest, all, call, put, take, select } from 'redux-saga/effects';
import axios from 'axios';
import { FormTypes } from './form.types';
import { getMainObject } from './form.selectors';

export function* postRequest() {
    try {
        const fd = new FormData();
        const mainDataObject = yield select(getMainObject);
        // Object.keys(mainDataObject).forEach((key) => {
        //     fd.append(key, mainDataObject[key]);
        // });
        // fd.append('token', '0f90a3c3ac54034b3e3675b2a4160ed7');
        const response = yield call(
            axios.postForm,
            'https://pcfy.redberryinternship.ge/api/laptop/create',
            fd
        );
        yield put(FormTypes.POST_REQUEST_SUCCESS);
    } catch (err) {
        yield put(FormTypes.POST_REQUEST_FAIL);
    }
}

export function* onPostRequestStart() {
    yield takeLatest(FormTypes.SEND_POST_REQUEST);
}

export function* formSagas() {
    yield all([call(onPostRequestStart)]);
}
