import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';
import { ReactComponent as GELsymbol } from '../../../assets/addLaptop/GEL.svg';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { ReactComponent as Check } from '../../../assets/addLaptop/GreenCheck.svg';
import { ReactComponent as ErrorSvg } from '../../../assets/addLaptop/ErrorSvg.svg';
import { ReactComponent as CameraSvg } from '../../../assets/addLaptop/camera.svg';
import {
    FormContainer,
    MultipleInputContainer,
    RouteButtonsContainer,
} from '../../../shared/formContainerWrappers/formContainerWrappers';
import {
    DropzoneTextContainer,
    ImageDropInputContainer,
    ImageInput,
    SelectedImgFooter,
    ThinLine,
} from './laptop-info.styles';
import { RadioButtons } from '../../../components/RadioButtons/radio-button.component';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { LaptopService } from './laptop-info.service';

const diskTypes = [
    { type: 'SSD', value: 'SSD' },
    { type: 'HDD', value: 'HDD' },
];
const laptopCondition = [
    { type: 'ახალი', value: 'new' },
    { type: 'მეორადი', value: 'used' },
];

export const LaptopInfo = ({ setMainData, sendRequest, mobileState }) => {
    const imageInputRef = useRef();
    const didMountRef = useRef(false);
    const {
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
    } = LaptopService(didMountRef, imageInputRef, sendRequest, setMainData);
    const {
        activeNames,
        laptopFormObject,
        imageInputDragEnter,
        formErrors,
        currData,
    } = state;

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
                                {!mobileState ? (
                                    <>
                                        {formErrors.includes(
                                            'laptop_image'
                                        ) && <ErrorSvg />}{' '}
                                        <p>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
                                        <BlueButton
                                            onClick={addPhotoHandler}
                                            type='button'
                                        >
                                            ატვირთე
                                        </BlueButton>
                                    </>
                                ) : (
                                    <>
                                        <CameraSvg />
                                        <p>ატვირთე ლეპტოპის ფოტო</p>
                                        {formErrors.includes(
                                            'laptop_image'
                                        ) && <ErrorSvg />}
                                    </>
                                )}
                            </>
                        )}
                    </DropzoneTextContainer>
                ) : (
                    <img
                        src={
                            laptopFormObject.laptop_image !== null
                                ? URL.createObjectURL(
                                      laptopFormObject.laptop_image
                                  )
                                : ''
                        }
                        alt='user-upload'
                    />
                )}
            </ImageDropInputContainer>
            {laptopFormObject.laptop_image && (
                <SelectedImgFooter>
                    <div>
                        <Check />
                        <span>{laptopFormObject.laptop_image.name}</span>
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
                    min='0'
                    name='laptop_cpu_cores'
                    value={laptopFormObject.laptop_cpu_cores}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_cpu_cores')}
                />
                <FormInput
                    type='number'
                    min='0'
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
                    min='0'
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
                    min='0'
                    label={'ლეპტოპის ფასი'}
                    content='ლეპტოპის ფასი'
                    placeholder='0000'
                    name='laptop_price'
                    InputSymbol={GELsymbol}
                    value={laptopFormObject.laptop_price}
                    onChange={onChangeHandler}
                    errorState={formErrors.includes('laptop_price')}
                />
            </MultipleInputContainer>

            <RadioButtons
                label={'ლეპტოპის მდგომარეობა'}
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
