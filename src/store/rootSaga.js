import { all, call } from 'redux-saga/effects';
import { formSagas } from './Form/form-global/form.sagas';

export function* rootSaga() {
    yield all([call(formSagas)]);
}
