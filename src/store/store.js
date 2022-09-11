import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import { rootSaga } from './rootSaga';
import { rootReducer } from './rootReducer';
const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];
export const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
});

sagaMiddleware.run(rootSaga);
