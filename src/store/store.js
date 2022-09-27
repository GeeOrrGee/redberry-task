import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
export const sagaMiddleware = createSagaMiddleware();
export const middlewares = [logger, sagaMiddleware];
const persistConfig = {
    key: 'root',
    whitelist: ['form'],
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
