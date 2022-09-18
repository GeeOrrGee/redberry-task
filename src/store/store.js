import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './rootSaga';
export const sagaMiddleware = createSagaMiddleware();
export const middlewares = [logger, sagaMiddleware];

export const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
});

sagaMiddleware.run(rootSaga);
