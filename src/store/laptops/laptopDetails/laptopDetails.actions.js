import createAction from '../../../utils/action-creator';
import { laptopDetailsTypes } from './laptopDetails.types';

// sagas
export const fetchLaptopDetailsStart = (id) =>
    createAction(laptopDetailsTypes.FETCH_LAPTOP_DATA_START, id);
export const fetchLaptopDetailsSuccess = (data) =>
    createAction(laptopDetailsTypes.FETCH_LAPTOP_DATA_SUCCESS, data);
export const fetchLaptopDetailsFail = (error) =>
    createAction(laptopDetailsTypes.FETCH_LAPTOP_DATA_FAIL, error);
