import { InputLabelWrapper, InputField } from './input-field.styles';
import { Label } from '../../shared/formContainerWrappers/formContainerWrappers';

export const FormInput = ({
    content,
    label,
    InputSymbol,
    errorState,
    ...otherProps
}) => {
    return (
        <InputLabelWrapper errorState={errorState} content={content}>
            <Label errorState={errorState}>{label}</Label>
            <InputField errorState={errorState} {...otherProps} />
            {InputSymbol && <InputSymbol />}
        </InputLabelWrapper>
    );
};
