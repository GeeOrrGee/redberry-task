import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];
export const store = configureStore({
    reducer: {},
    middleware: middlewares,
});
