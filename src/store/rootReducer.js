import { combineReducers } from '@reduxjs/toolkit';
import { formReducer } from './Form/form-reducer';

export const rootReducer = combineReducers({
    form: formReducer,
});
