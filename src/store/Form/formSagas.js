import { all, call } from 'redux-saga/effects';
import { globalFormSaga } from './form-global/globalForm.sagas';
import { laptopFormSagas } from './laptop-form/laptop-form.sagas';
import { userFormSaga } from './user-form/user-form.sagas';

export function* formSagas() {
    yield all([
        call(userFormSaga),
        call(globalFormSaga),
        call(laptopFormSagas),
    ]);
}
