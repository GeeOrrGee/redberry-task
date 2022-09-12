import { combineReducers } from '@reduxjs/toolkit';
import { formReducer } from './Form/form-reducer';
import coworkerReducer from './Form/user-form/user-form.reducer';

export const rootReducer = combineReducers({
    form: formReducer,
});
