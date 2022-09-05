import { useEffect, useState } from 'react';
import { Label } from '../../shared/formContainerWrappers/formContainerWrappers';
import { ReactComponent as ErrorSvg } from '../../assets/addLaptop/ErrorSvg.svg';
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
    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem(`radio-btn-state-${label}`)
        );
        if (persistedState && !currentActive) {
            setCurrentActive(persistedState);
            return;
        }
    }, [currentActive, label]);

    useEffect(() => {
        if (currentActive) {
            localStorage.setItem(
                `radio-btn-state-${label}`,
                JSON.stringify(currentActive)
            );
        }
    }, [label, currentActive]);

    const onRadioClickHandler = (btnValue) => {
        setCurrentActive(btnValue);
        callbackHandler(name, btnValue);
    };
    return (
        <RadioContainer>
            <Label errorState={errorState}>
                {label}
                {errorState && <ErrorSvg />}
            </Label>
            <RadioOptionsContainer>
                {data.map(({ type, value }) => {
                    return (
                        <RadioOption
                            key={type}
                            onClick={(e) => onRadioClickHandler(value)}
                        >
                            <RadioButton active={value === currentActive} />
                            <span>{type}</span>
                        </RadioOption>
                    );
                })}
            </RadioOptionsContainer>
        </RadioContainer>
    );
};
