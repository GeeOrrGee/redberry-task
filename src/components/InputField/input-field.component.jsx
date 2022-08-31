import { useRef } from 'react';
import { InputLabelWrapper, Label, InputField } from './input-field.styles';

export const FormInput = ({ content, label, errorState, ...otherProps }) => {
    return (
        <InputLabelWrapper errorState={errorState} content={content}>
            <Label errorState={errorState}>{label}</Label>
            <InputField errorState={errorState} {...otherProps} />
        </InputLabelWrapper>
    );
};
