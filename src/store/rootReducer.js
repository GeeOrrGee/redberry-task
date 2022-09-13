import { combineReducers } from '@reduxjs/toolkit';
import { formGlobalReducer } from './Form/form-global/form-reducer';
import coworkerReducer from './Form/user-form/user-form.reducer';

export const rootReducer = combineReducers({
    form: combineReducers({
        formGlobalReducer,
        user: coworkerReducer,
    }),
});
