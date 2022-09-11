import { takeLatest, all, call, put, take, select } from 'redux-saga/effects';
import axios from 'axios';
import { FormTypes } from './form.types';
import { selectMainObject } from './form.selectors';
import { onPostRequestFail, onPostRequestSuccess } from './form-actions';

export function* postRequest() {
    try {
        const fd = new FormData();
        const mainDataObject = yield select(selectMainObject);
        Object.keys(mainDataObject).forEach((key) => {
            fd.append(key, mainDataObject[key]);
        });
        fd.append('token', '65c73ba7087323760a1a95ac1232f5fe');
        const response = yield call(
            axios.postForm,
            'https://pcfy.redberryinternship.ge/api/laptop/create',
            fd
        );

        yield put(onPostRequestSuccess());
    } catch (err) {
        yield put(onPostRequestFail(err));
    }
}

export function* onPostRequestStart() {
    yield takeLatest(FormTypes.SEND_POST_REQUEST, postRequest);
}

export function* formSagas() {
    yield all([call(onPostRequestStart)]);
}
