import { laptopDetailsTypes } from './laptopDetails.types';
const defaultData = {
    user: {},
    laptop: {},
    extra: {},
    image: '',
};
const defaultState = {
    fetchedData: defaultData,
    loading: false,
    error: null,
};
export const laptopDetailsReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;
    console.log(action);
    switch (type) {
        case laptopDetailsTypes.FETCH_LAPTOP_DATA_START:
            return { ...state, loading: true };
        case laptopDetailsTypes.FETCH_LAPTOP_DATA_SUCCESS:
            return { ...state, loading: false, fetchedData: payload };
        case laptopDetailsTypes.FETCH_LAPTOP_DATA_FAIL:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
};
