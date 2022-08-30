import { DropdownField, Option, OptionsContainer } from './dropdown.styles';

import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import { forwardRef, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const Dropdown = ({
    name,
    activeTeamId = 0,
    callbackHandler = null,
    dataUrl,

    ...otherProps
}) => {
    const dropdownRef = useRef();
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
        return window.removeEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
    }, []);

    const [activeDropdown, setActiveDropdown] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    const [currData, setCurrData] = useState([]);
    const [activeTitle, setActiveTitle] = useState(name);
    const dropdownToggleHandler = () =>
        activeDropdown === name
            ? setActiveDropdown('')
            : setActiveDropdown(name);

    useEffect(() => {}, []);

    const onSelectHandler = (e) => {
        callbackHandler();
    };
    return (
        <DropdownField
            ref={dropdownRef}
            {...otherProps}
            onClick={dropdownToggleHandler}
        >
            <p>{activeTitle}</p>
            <Vector />
            {activeDropdown === name && (
                <OptionsContainer>
                    {currData.map((dataObj) => (
                        <Option
                            onClick={onSelectHandler}
                            data-id={dataObj.id}
                            data-teamid={dataObj?.team_id}
                        >
                            {dataObj.name}
                        </Option>
                    ))}
                </OptionsContainer>
            )}
        </DropdownField>
    );
};
