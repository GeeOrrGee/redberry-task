import { useEffect, useRef, useState } from 'react';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';
import { InputField } from '../../../components/InputField/input-field.styles';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import {
    FormContainer,
    MultipleInputContainer,
} from '../../../shared/formContainerWrappers/formContainerWrappers';
import {
    DropzoneTextContainer,
    ImageDropInputContainer,
    ImageInput,
    ThinLine,
} from './laptop-info.styles';

export const LaptopInfo = () => {
    const imageInputRef = useRef(false);
    const [imageInputDragEnter, setImageInputDragEnter] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const dragHandler = (e) => {
        e.stopPropagation();
        setImageInputDragEnter(!imageInputDragEnter);
    };

    const addPhotoHandler = () => {
        imageInputRef.current.click();
    };

    const dropHandler = (e) => {
        e.stopPropagation();
        if (e.target.files[0]) {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
        setImageInputDragEnter(false);
    };

    return (
        <FormContainer>
            <ImageDropInputContainer backgroundUrl={imageUrl}>
                <ImageInput
                    onDragLeave={(e) => dragHandler(e)}
                    onDragEnter={(e) => dragHandler(e)}
                    onChange={dropHandler}
                    imageInputDragEnter={imageInputDragEnter}
                    type={'file'}
                    accept='image/*'
                    ref={imageInputRef}
                />
                {!imageUrl && (
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
                )}
            </ImageDropInputContainer>
            <MultipleInputContainer>
                <FormInput
                    label='ლეპტოპის სახელი'
                    placeholder='HP'
                    wide='mid'
                    type='text'
                    content={'ლათინური ასოები, ციფრები, !@#$%^&*()_+= '}
                />
                <Dropdown name={'ლეპტოპის ბრენდი'} />
            </MultipleInputContainer>
            <ThinLine />
            <MultipleInputContainer>
                <Dropdown name={'CPU'} />
                <FormInput
                    label='CPU-ს ბირთვი'
                    content={'მხოლოდ ციფრები'}
                    placeholder='14'
                    type='number'
                />
                <FormInput
                    type='number'
                    label='CPU-ს ნაკადი'
                    content={'მხოლოდ ციფრები'}
                    placeholder='365'
                />
            </MultipleInputContainer>
            <MultipleInputContainer>
                <FormInput
                    type='number'
                    label={'ლეპტოპის RAM (GB)'}
                    content='მხოლოდ ციფრები'
                    placeholder='16'
                />
            </MultipleInputContainer>
            <ThinLine />

            <MultipleInputContainer>
                <FormInput
                    label={'შეძენის რიცხვი (არჩევითი)'}
                    placeholder='დდ / თთ / წწწწ'
                />
                <FormInput
                    type='number'
                    label={'ლეპტოპის ფასი'}
                    content='ლეპტოპის ფასი'
                    placeholder='0000'
                />
            </MultipleInputContainer>
        </FormContainer>
    );
};

export default LaptopInfo;
