import { laptopInfoTypes } from './laptop-form.types';
export const defaultLaptopObject = {
    laptop_name: '',
    laptop_image: null,
    laptop_brand_id: '',
    laptop_cpu: '',
    laptop_cpu_cores: '',
    laptop_cpu_threads: '',
    laptop_ram: '',
    laptop_hard_drive_type: '',
    laptop_state: '',
    laptop_purchase_date: '',
    laptop_price: '',
};

export const defaultState = {
    laptopFormObject: defaultLaptopObject,
    imageInputDragEnter: false,
    formErrors: [],
    fetchedData: {},
    currData: {},
    activeNames: {
        laptop_cpu: 'CPU',
        laptop_brand_id: 'ლეპტოპის ბრენდი',
    },
};

export const laptopInfoReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case laptopInfoTypes.SET_FORM_ERRORS:
            return { ...state, formErrors: payload };
        case laptopInfoTypes.SET_IMAGE_INPUT_DRAG_ENTER:
            return { ...state, imageInputDragEnter: payload };

        case laptopInfoTypes.SET_LAPTOP_FORM_OBJECT:
            return { ...state, laptopFormObject: payload };
        case laptopInfoTypes.SET_FETCHED_DATA:
            return { ...state, fetchedData: payload, currData: payload };
        case laptopInfoTypes.SET_CURR_DATA:
            return { ...state, currData: payload };
        case laptopInfoTypes.SET_ACTIVE_NAMES:
            return { ...state, activeNames: payload };

        default:
            return state;
    }
};

export default laptopInfoReducer;
