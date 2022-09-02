import { useEffect, useReducer, useRef, useState } from 'react';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { ReactComponent as Check } from '../../../assets/addLaptop/GreenCheck.svg';
import {
    FormContainer,
    MultipleInputContainer,
    RouteButtonsContainer,
} from '../../../shared/formContainerWrappers/formContainerWrappers';
import createAction from '../../../utils/action-creator';
import { laptopInfoReducer, defaultState } from './laptop-info.reducer';
import {
    DropzoneTextContainer,
    ImageDropInputContainer,
    ImageInput,
    SelectedImgFooter,
    ThinLine,
} from './laptop-info.styles';

import { laptopInfoTypes } from './laptop-info.types';
import { RadioButtons } from '../../../components/RadioButtons/radio-button.component';
import axios from 'axios';
import { Link } from 'react-router-dom';

const diskTypes = [
    { type: 'SSD', value: 'SSD' },
    { type: 'HDD', value: 'HDD' },
];
const laptopCondition = [
    { type: 'ახალი', value: 'new' },
    { type: 'მეორადი', value: 'used' },
];
export const LaptopInfo = ({
    mainDataObject,
    setMainDataObject,
    setSendData,
}) => {
    const imageInputRef = useRef();
    const didMountRef = useRef(false);
    const [state, dispatch] = useReducer(laptopInfoReducer, defaultState);

    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem('laptop-info-state')
        );

        if (persistedState) {
            dispatch(
                createAction(laptopInfoTypes.REHYDRATE_STATE, persistedState)
            );
        }
        console.log(persistedState);
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem('laptop-info-state', JSON.stringify(state));
        }
        didMountRef.current = true;
    }, [state]);

    const {
        activeNames,
        laptopFormObject,
        imageInputDragEnter,
        formErrors,
        fetchedData,
        currData,
    } = state;

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

    const formValidation = () => {
        const fields = Object.keys(laptopFormObject);

        const errorsArray = fields.filter((field) => {
            const value = laptopFormObject[field];
            if (field === 'laptop_purchase_date' && !value) {
                return false;
            } else if (field === 'laptop_purchase_date') {
                const correctDate = value.match(
                    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                );
                return !correctDate;
            }
            if (!value) return !value;
            if (field === 'laptop_name') {
                const containsCorrectCharacters = value.match(
                    /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/
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
        setMainDataObject({ ...mainDataObject, ...laptopFormObject });
        setSendData(true);
    };
    return (
        <FormContainer onSubmit={onSubmitHandler}>
            <ImageDropInputContainer
                errorState={formErrors.includes('laptop_image')}
            >
                <ImageInput
                    onDragLeave={(e) => dragHandler(e)}
                    onDragEnter={(e) => dragHandler(e)}
                    onChange={dropHandler}
                    imageInputDragEnter={imageInputDragEnter}
                    type={'file'}
                    accept='image/*'
                    ref={imageInputRef}
                />
                {!laptopFormObject.laptop_image ? (
                    <DropzoneTextContainer>
                        {imageInputDragEnter ? (
                            <p>Drop Here !</p>
                        ) : (
                            <>
                                {' '}
                                <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
                                <BlueButton
                                    onClick={addPhotoHandler}
                                    type='button'
                                >
                                    ატვირთე
                                </BlueButton>
                            </>
                        )}
                    </DropzoneTextContainer>
                ) : (
                    <img
                        // src={URL.createObjectURL(laptopFormObject.laptop_image)}
                        alt='user-upload'
                    />
                )}
            </ImageDropInputContainer>
            {laptopFormObject.laptop_image && (
                <SelectedImgFooter>
                    <div>
                        <Check />
                        <p>{laptopFormObject.laptop_image.name}</p>
                    </div>
                    <BlueButton type='button' onClick={removeImgHandler}>
                        თავიდან ატვირთე
                    </BlueButton>
                </SelectedImgFooter>
            )}

            <MultipleInputContainer>
                <FormInput
                    label='ლეპტოპის სახელი'
                    name='laptop_name'
                    placeholder='HP'
                    wide='mid'
                    type='text'
                    content={'ლათინური ასოები, ციფრები, !@#$%^&*()_+= '}
                    value={laptopFormObject.laptop_name}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_name')}
                />
                <Dropdown
                    name={activeNames.laptop_brand_id}
                    callbackHandler={onBrandsDropdownHandler}
                    data={currData.brands}
                    onSelectHandler={onDropDownSelectHandler}
                    errorState={formErrors.includes('laptop_brand_id')}
                />
            </MultipleInputContainer>
            <ThinLine />
            <MultipleInputContainer>
                <Dropdown
                    data={currData.cpus}
                    name={activeNames.laptop_cpu}
                    callbackHandler={onCpuDropdownHandler}
                    onSelectHandler={onDropDownSelectHandler}
                    errorState={formErrors.includes('laptop_cpu')}
                />
                <FormInput
                    label='CPU-ს ბირთვი'
                    content={'მხოლოდ ციფრები'}
                    placeholder='14'
                    type='number'
                    name='laptop_cpu_cores'
                    value={laptopFormObject.laptop_cpu_cores}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_cpu_cores')}
                />
                <FormInput
                    type='number'
                    label='CPU-ს ნაკადი'
                    content={'მხოლოდ ციფრები'}
                    name='laptop_cpu_threads'
                    placeholder='365'
                    value={laptopFormObject.laptop_cpu_threads}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_cpu_threads')}
                />
            </MultipleInputContainer>
            <MultipleInputContainer>
                <FormInput
                    type='number'
                    label={'ლეპტოპის RAM (GB)'}
                    content='მხოლოდ ციფრები'
                    placeholder='16'
                    name='laptop_ram'
                    value={laptopFormObject.laptop_ram}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_ram')}
                />

                <RadioButtons
                    label={'მეხსიერების ტიპი'}
                    data={diskTypes}
                    name={'laptop_hard_drive_type'}
                    callbackHandler={onRadioSelectHandler}
                    errorState={formErrors.includes('laptop_hard_drive_type')}
                />
            </MultipleInputContainer>
            <ThinLine />

            <MultipleInputContainer>
                <FormInput
                    label={'შეძენის რიცხვი (არჩევითი)'}
                    placeholder='დდ / თთ / წწწწ'
                    name='laptop_purchase_date'
                    value={laptopFormObject.laptop_purchase_date}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_purchase_date')}
                />
                <FormInput
                    type='number'
                    label={'ლეპტოპის ფასი'}
                    content='ლეპტოპის ფასი'
                    placeholder='0000'
                    name='laptop_price'
                    value={laptopFormObject.laptop_price}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_name')}
                />
            </MultipleInputContainer>

            <RadioButtons
                label={'მეხსიერების ტიპი'}
                data={laptopCondition}
                name={'laptop_state'}
                callbackHandler={onRadioSelectHandler}
                errorState={formErrors.includes('laptop_state')}
            />
            <RouteButtonsContainer>
                <Link to='/add-laptop/coworker-info'>უკან</Link>
                <div>
                    <BlueButton type='submit'>დამახსოვრება</BlueButton>
                </div>
            </RouteButtonsContainer>
        </FormContainer>
    );
};

export default LaptopInfo;
