import createAction from '../../../utils/action-creator';
import { formTypes } from './globalForm.types';

export const setDefault = () => createAction(formTypes.SET_DEFAULT);

export const removeSuccessModal = () =>
    createAction(formTypes.SET_SUCCES_MODAL);

export const sendPostRequest = (data) =>
    createAction(formTypes.SEND_POST_REQUEST, data);

export const onPostRequestSuccess = () =>
    createAction(formTypes.POST_REQUEST_SUCCESS);
export const onPostRequestFail = (error) =>
    createAction(formTypes.POST_REQUEST_FAIL, error);

export const setMainObject = (object) =>
    createAction(formTypes.SET_MAIN_OBJECT, object);
