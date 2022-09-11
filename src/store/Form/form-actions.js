import createAction from '../../utils/action-creator';
import { FormTypes } from './form.types';

export const sendPostRequest = (data) =>
    createAction(FormTypes.SEND_POST_REQUEST, data);

export const onPostRequestSuccess = (response) => createAction(response);
export const onPostRequestFail = (type, error) => createAction(type, error);
