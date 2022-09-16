import { all, call } from 'redux-saga/effects';
import { formSagas } from './Form/form-global/form.sagas';
import { userFormSaga } from './Form/user-form/user-form.sagas';

export function* rootSaga() {
    yield all([call(formSagas), call(userFormSaga)]);
}
