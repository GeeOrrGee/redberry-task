import { useReducer, useEffect } from 'react';
import createAction from '../../../utils/action-creator';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLaptopInfo } from '../../../store/Form/laptop-form/laptop-form.selectors';
import {
    setImageInputDragEnter,
    setLaptopActiveNames,
    setLaptopData,
    setLaptopFormErrors,
    setLaptopFormObject,
} from '../../../store/Form/laptop-form/laptop-form.actions';
export const LaptopService = (
    didMountRef,
    imageInputRef,
    sendRequest,
    setMainData
) => {
    const dispatch = useDispatch();
    //localStorage logic

    /////////////////////////////////////////////
    const laptopInfoState = useSelector(selectLaptopInfo);
    const {
        imageInputDragEnter,
        laptopFormObject,
        formErrors,
        activeNames,
        fetchedData,
    } = laptopInfoState;
    //image drop handler logic
    const dragHandler = (e) => {
        e.stopPropagation();

        dispatch(setImageInputDragEnter(!imageInputDragEnter));
    };

    const addPhotoHandler = (e) => {
        e.preventDefault();
        imageInputRef.current.click();
    };

    const removeImgHandler = (e) => {
        e.preventDefault();
        imageInputRef.current.value = null;

        dispatch(
            setLaptopFormObject({
                ...laptopFormObject,
                laptop_image: null,
            })
        );
    };
    const dropHandler = (e) => {
        // e.stopPropagation();
        if (formErrors.includes('laptop_image')) {
            dispatch(
                setLaptopFormErrors(
                    formErrors.filter((err) => err !== 'laptop_image')
                )
            );
        }
        if (e.target.files && e.target.files[0]) {
            dispatch(
                setLaptopFormObject({
                    ...laptopFormObject,
                    laptop_image: e.target.files[0],
                })
            );
        }
        dispatch(setImageInputDragEnter(false));
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
                setLaptopData({
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
                setLaptopData({
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
                setLaptopFormErrors(
                    formErrors.filter((err) => err !== fieldName)
                )
            );
        }
        dispatch(
            setLaptopActiveNames({
                ...activeNames,
                [fieldName]: name,
            })
        );
        if (fieldName === 'laptop_cpu') {
            dispatch(
                setLaptopFormObject({
                    ...laptopFormObject,
                    [fieldName]: name,
                })
            );
            return;
        } else if (fieldName === 'laptop_brand_id') {
            dispatch(
                setLaptopFormObject({
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
                setLaptopFormErrors(formErrors.filter((err) => err !== key))
            );
        }
        if (value === laptopFormObject[key]) return;
        dispatch(
            setLaptopFormObject({
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
                setLaptopFormErrors(
                    formErrors.filter((err) => err !== inputType)
                )
            );
        }
        if (e.target.type === 'number') {
            dispatch(
                setLaptopFormObject({
                    ...laptopFormObject,
                    [inputType]: value ? parseFloat(value) : '',
                })
            );
            return;
        }

        dispatch(
            setLaptopFormObject({
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
            dispatch(setLaptopFormErrors(errArray));
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
        laptopInfoState,
    };
};
