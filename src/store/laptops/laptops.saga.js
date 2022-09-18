import { all, call } from 'redux-saga/effects';
import { laptopDetailsSagas } from './laptopDetails/laptopDetails.sagas';
import { laptopsListSagas } from './laptopsList/laptopsList.sagas';

export function* laptopsSagas() {
    yield all([call(laptopsListSagas), call(laptopDetailsSagas)]);
}
