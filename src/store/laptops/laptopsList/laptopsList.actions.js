import createAction from '../../../utils/action-creator';
import { laptopsListTypes } from './laptopsList.types';

// sagas
export const fetchLaptopsStart = () =>
    createAction(laptopsListTypes.FETCH_LAPTOPS_START);
export const fetchLaptopsSuccess = (data) =>
    createAction(laptopsListTypes.FETCH_LAPTOPS_SUCCESS, data);
export const fetchLaptopsError = (error) =>
    createAction(laptopsListTypes.FETCH_LAPTOPS_FAIL, error);
