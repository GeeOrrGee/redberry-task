import createAction from '../../../utils/action-creator';
import { laptopInfoTypes } from './laptop-form.types';

export const setLaptopFormErrors = (errors) =>
    createAction(laptopInfoTypes.SET_FORM_ERRORS, errors);

export const setImageInputDragEnter = (payload) =>
    createAction(laptopInfoTypes.SET_IMAGE_INPUT_DRAG_ENTER, payload); //boolean

export const setLaptopData = (data) =>
    createAction(laptopInfoTypes.SET_FETCHED_DATA, data);

export const setCurrentData = (currData) =>
    createAction(laptopInfoTypes.SET_CURR_DATA, currData);

export const setLaptopActiveNames = (activeNames) =>
    createAction(laptopInfoTypes.SET_ACTIVE_NAMES, activeNames);

export const setLaptopFormObject = (laptopInfo) =>
    createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, laptopInfo);
