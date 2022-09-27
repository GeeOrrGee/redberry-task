import { combineReducers } from '@reduxjs/toolkit';
import { formGlobalReducer } from './Form/form-global/globalForm-reducer';
import laptopInfoReducer from './Form/laptop-form/laptop-form.reducer';
import coworkerReducer from './Form/user-form/user-form.reducer';
import { laptopDetailsReducer } from './laptops/laptopDetails/laptopDetails.reducer';
import { laptopsListReducer } from './laptops/laptopsList/laptopsList.reducer';
import storage from 'redux-persist/lib/storage';
import { formTypes } from './Form/form-global/globalForm.types';

export const rootReducer = combineReducers({
    form: combineReducers({
        formGlobalReducer,
        user: coworkerReducer,
        laptop: laptopInfoReducer,
    }),
    laptops: combineReducers({
        laptopsList: laptopsListReducer,
        laptopDetails: laptopDetailsReducer,
    }),
});

// export const rootReducer = (state = {}, action) => {
//     if (action.type === formTypes.SET_DEFAULT) {
//         console.log(state, storage);
//         storage.removeItem('persist:root');
//         return state;
//     }

//     return appReducer(state, action);
// };
