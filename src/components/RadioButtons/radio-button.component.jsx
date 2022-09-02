import { useEffect, useRef, useState } from 'react';
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
    const didMountRef = useRef(false);
    const [currentActive, setCurrentActive] = useState('');
    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem('radio-btn-state')
        );

        if (persistedState) {
            // const { name } = persistedState;
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
            <Label errorState={errorState}>{label}</Label>
            <RadioOptionsContainer>
                {data.map(({ type, value }) => {
                    return (
                        <RadioOption
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
