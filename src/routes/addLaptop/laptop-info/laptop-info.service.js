import laptopInfoReducer from './laptop-info.reducer';
import { laptopInfoTypes } from './laptop-info.types';
import { useReducer, useEffect } from 'react';
import { defaultState } from './laptop-info.reducer';
import createAction from '../../../utils/action-creator';
import axios from 'axios';
export const LaptopService = (
    didMountRef,
    imageInputRef,
    sendRequest,
    setMainData
) => {
    const [state, dispatch] = useReducer(laptopInfoReducer, defaultState);
    const {
        activeNames,
        laptopFormObject,
        imageInputDragEnter,
        formErrors,
        fetchedData,
    } = state;

    //localStorage logic

    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem('laptop-info-state')
        );

        if (persistedState) {
            dispatch(
                createAction(laptopInfoTypes.REHYDRATE_STATE, persistedState)
            );
        }
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            const modifiedState = {
                ...state,
                laptopFormObject: {
                    ...laptopFormObject,
                    laptop_image: null,
                },
            };
            localStorage.setItem(
                'laptop-info-state',
                JSON.stringify(modifiedState)
            );
        }
        didMountRef.current = true;
    }, [laptopFormObject, state, didMountRef]);

    /////////////////////////////////////////////

    //image drop handler logic
    const dragHandler = (e) => {
        e.stopPropagation();

        dispatch(
            createAction(
                laptopInfoTypes.SET_IMAGE_INPUT_DRAG_ENTER,
                !imageInputDragEnter
            )
        );
    };

    const addPhotoHandler = (e) => {
        e.preventDefault();
        imageInputRef.current.click();
    };

    const removeImgHandler = (e) => {
        e.preventDefault();
        imageInputRef.current.value = null;

        dispatch(
            createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                ...laptopFormObject,
                laptop_image: null,
            })
        );
    };
    const dropHandler = (e) => {
        // e.stopPropagation();
        if (formErrors.includes('laptop_image')) {
            dispatch(
                createAction(
                    laptopInfoTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== 'laptop_image')
                )
            );
        }
        if (e.target.files && e.target.files[0]) {
            dispatch(
                createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                    ...laptopFormObject,
                    laptop_image: e.target.files[0],
                })
            );
        }
        dispatch(
            createAction(laptopInfoTypes.SET_IMAGE_INPUT_DRAG_ENTER, false)
        );
    };

    ////////////////////////////////////////////////////
    //////////////////Dropdown Logic //////////////////

    const onBrandsDropdownHandler = async () => {
        if (fetchedData.brands?.length) return;
        try {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/brands');

            const modifiedData = data.map((obj) => ({
                ...obj,
                fieldName: 'laptop_brand_id',
            }));
            dispatch(
                createAction(laptopInfoTypes.SET_FETCHED_DATA, {
                    ...fetchedData,
                    brands: modifiedData,
                })
            );
        } catch (err) {
            throw err;
        }
    };
    const onCpuDropdownHandler = async () => {
        if (fetchedData.cpus?.length) return;
        try {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/cpus');

            const modifiedData = data.map((obj) => ({
                ...obj,
                fieldName: 'laptop_cpu',
            }));

            dispatch(
                createAction(laptopInfoTypes.SET_FETCHED_DATA, {
                    ...fetchedData,
                    cpus: modifiedData,
                })
            );
        } catch (err) {
            throw err;
        }
    };

    const onDropDownSelectHandler = (dataObj) => {
        const { fieldName, name, id } = dataObj;
        if (formErrors.includes(fieldName)) {
            dispatch(
                createAction(
                    laptopInfoTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== fieldName)
                )
            );
        }
        dispatch(
            createAction(laptopInfoTypes.SET_ACTIVE_NAMES, {
                ...activeNames,
                [fieldName]: name,
            })
        );
        if (fieldName === 'laptop_cpu') {
            dispatch(
                createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                    ...laptopFormObject,
                    [fieldName]: name,
                })
            );
            return;
        } else if (fieldName === 'laptop_brand_id') {
            dispatch(
                createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                    ...laptopFormObject,
                    [fieldName]: id,
                })
            );
            return;
        }
    };

    const onRadioSelectHandler = (key, value) => {
        if (formErrors.includes(key)) {
            dispatch(
                createAction(
                    laptopInfoTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== key)
                )
            );
        }
        if (value === laptopFormObject[key]) return;
        dispatch(
            createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                ...laptopFormObject,
                [key]: value,
            })
        );
    };
    ////////////////////////////////////////////////////
    //////////////////Input(type text/num) onChange  Logic //////////////////

    const onChangeHandler = (e) => {
        const inputType = e.target.name;
        const value = e.target.value;
        if (formErrors.includes(inputType)) {
            dispatch(
                createAction(
                    laptopInfoTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== inputType)
                )
            );
        }
        if (e.target.type === 'number') {
            dispatch(
                createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                    ...laptopFormObject,
                    [inputType]: value ? parseFloat(value) : '',
                })
            );
            return;
        }

        dispatch(
            createAction(laptopInfoTypes.SET_LAPTOP_FORM_OBJECT, {
                ...laptopFormObject,
                [inputType]: value,
            })
        );
    };

    ///////////////////////////////////////////////////////
    //////////////////Form Errors Buffer //////////////////
    //returns an array of input names which didn't pass the validation

    const formValidation = () => {
        const fields = Object.keys(laptopFormObject);

        const errorsArray = fields.filter((field) => {
            const value = laptopFormObject[field];
            console.log(value);
            if (field === 'laptop_purchase_date' && !value) {
                return false;
            } else if (field === 'laptop_purchase_date') {
                const correctDate = value.match(
                    // /^(0?[1-9]|[12][0-9]|3[01])[\\-](0?[1-9]|1[012])[\\-]\d{4}$/
                    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i
                );

                return !correctDate;
            }
            console.log(field, value);
            if (!value) return !value;
            if (field === 'laptop_name') {
                const containsCorrectCharacters = value.match(
                    /^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/
                );
                return !containsCorrectCharacters;
            }
            return !value;
        });
        return errorsArray;
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const errArray = formValidation();
        if (errArray.length) {
            dispatch(createAction(laptopInfoTypes.SET_FORM_ERRORS, errArray));
            return;
        }
        setMainData(laptopFormObject);
        // setLoadingState(true);
        sendRequest();
    };

    return {
        onSubmitHandler,
        onChangeHandler,
        onRadioSelectHandler,
        onDropDownSelectHandler,
        onCpuDropdownHandler,
        onBrandsDropdownHandler,
        dropHandler,
        removeImgHandler,
        addPhotoHandler,
        dragHandler,
        state,
    };
};
