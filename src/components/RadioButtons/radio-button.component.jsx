import { useEffect, useRef, useState } from 'react';
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
    const didMountRef = useRef(false);
    const [currentActive, setCurrentActive] = useState('');
    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem('radio-btn-state')
        );

        if (persistedState) {
            setCurrentActive(persistedState);
            return;
        }
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem(
                'radio-btn-state',
                JSON.stringify(currentActive)
            );
        }

        didMountRef.current = true;
    }, [currentActive]);

    const onRadioClickHandler = (btnValue) => {
        setCurrentActive(btnValue);
        callbackHandler(name, btnValue);
    };
    return (
        <RadioContainer>
            <Label errorState={errorState}>
                {label}
                {label === 'მეხსიერების ტიპი' && errorState && <ErrorSvg />}
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
