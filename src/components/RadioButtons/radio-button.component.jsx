import { useState } from 'react';
import { Label } from '../../shared/formContainerWrappers/formContainerWrappers';
import {
    RadioButton,
    RadioContainer,
    RadioOption,
    RadioOptionsContainer,
} from './radio-button.styles';

export const RadioButtons = ({
    label,
    data = [],
    errorState,
    callbackHandler,
    name,
}) => {
    const [currentActive, setCurrentActive] = useState('');

    const onRadioClickHandler = (btnValue) => {
        setCurrentActive(btnValue);
        callbackHandler(name, btnValue);
    };
    return (
        <RadioContainer>
            <Label errorState={errorState}>{label}</Label>
            <RadioOptionsContainer>
                {data.map((type) => {
                    return (
                        <RadioOption onClick={(e) => onRadioClickHandler(type)}>
                            <RadioButton active={type === currentActive} />
                            <span>{type}</span>
                        </RadioOption>
                    );
                })}
            </RadioOptionsContainer>
        </RadioContainer>
    );
};
