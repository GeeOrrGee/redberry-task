import { all, call } from 'redux-saga/effects';
import { laptopsListSagas } from './laptopsList/laptopsList.sagas';

export function* laptopsSagas() {
    yield all([call(laptopsListSagas)]);
}
