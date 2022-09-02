import { DropdownField, Option, OptionsContainer } from './dropdown.styles';
import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import { useRef, useState, useEffect } from 'react';
import { Loader } from '../../shared/loader/loader.styles';

export const Dropdown = ({
    name, //displayName
    data = [],
    callbackHandler, // fetchData
    onSelectHandler,
    ...otherProps
}) => {
    const [activeDropdown, setActiveDropdown] = useState('');
    const [activeOption, setActiveOption] = useState(name);
    const dropdownRef = useRef();
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
        return window.addEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
    }, []);

    useEffect(() => {
        setActiveOption(name);
    }, [name]);

    const dropdownToggleHandler = () => {
        callbackHandler();
        return activeDropdown === name
            ? setActiveDropdown('')
            : setActiveDropdown(name);
    };

    const onClickHandler = (e, dataObj) => {
        setActiveOption(dataObj.name);
        onSelectHandler(dataObj);
    };
    return (
        <DropdownField
            ref={dropdownRef}
            {...otherProps}
            onClick={dropdownToggleHandler}
        >
            <p>{name}</p>
            <Vector />
            {activeDropdown === name && (
                <OptionsContainer>
                    {!data.length ? (
                        <Loader />
                    ) : (
                        data.map((dataObj) => (
                            <Option
                                active={dataObj.name === activeOption}
                                key={dataObj.name}
                                onClick={(e) => onClickHandler(e, dataObj)}
                            >
                                {dataObj.name}
                            </Option>
                        ))
                    )}
                </OptionsContainer>
            )}
        </DropdownField>
    );
};
