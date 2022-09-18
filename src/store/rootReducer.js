import { combineReducers } from '@reduxjs/toolkit';
import { formGlobalReducer } from './Form/form-global/globalForm-reducer';
import laptopInfoReducer from './Form/laptop-form/laptop-form.reducer';
import coworkerReducer from './Form/user-form/user-form.reducer';
import { laptopsListReducer } from './laptops/laptopsList/laptopsList.reducer';

export const rootReducer = combineReducers({
    form: combineReducers({
        formGlobalReducer,
        user: coworkerReducer,
        laptop: laptopInfoReducer,
    }),
    laptops: combineReducers({
        laptopsList: laptopsListReducer,
    }),
});
