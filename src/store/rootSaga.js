import { all, call } from 'redux-saga/effects';
import { formSagas } from './Form/formSagas';

export function* rootSaga() {
    yield all([call(formSagas)]);
}
