import { all, call } from 'redux-saga/effects';
import { formSagas } from './Form/formSagas';
import { laptopsSagas } from './laptops/laptops.saga';

export function* rootSaga() {
    yield all([call(formSagas), call(laptopsSagas)]);
}
