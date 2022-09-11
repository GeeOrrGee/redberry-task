import createAction from '../../utils/action-creator';
import { FormTypes } from './form.types';

export const sendPostRequest = (data) =>
    createAction(FormTypes.SEND_POST_REQUEST, data);

export const onPostRequestSuccess = () =>
    createAction(FormTypes.POST_REQUEST_SUCCESS);
export const onPostRequestFail = (error) =>
    createAction(FormTypes.POST_REQUEST_FAIL, error);

export const setMainObject = (object) =>
    createAction(FormTypes.SET_MAIN_OBJECT, object);
