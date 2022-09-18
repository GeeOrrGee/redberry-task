import { laptopsListTypes } from './laptopsList.types';

const defaultState = {
    fetchedData: [],
    loading: false,
    error: null,
};

export const laptopsListReducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case laptopsListTypes.FETCH_LAPTOPS_START:
            return { ...state, loading: true };
        case laptopsListTypes.FETCH_LAPTOPS_SUCCESS:
            return { ...state, fetchedData: payload, loading: false };
        case laptopsListTypes.FETCH_LAPTOPS_FAIL:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
};
