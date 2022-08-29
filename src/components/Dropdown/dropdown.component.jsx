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

    useEffect(() => {
        if (activeDropdown && !fetchedData.length) {
            axios(dataUrl).then(({ data: { data } }) => {
                setFetchedData(data);
                setCurrData(data);
            });
        }
        if (activeTeamId) {
            if (!fetchedData.length)
                axios(dataUrl).then(({ data: { data } }) => {
                    setFetchedData(data);
                    setCurrData(data);
                });
            const filteredPositions = fetchedData.filter((obj) =>
                obj.team_id ? obj.team_id === activeTeamId : obj
            );
            setCurrData(filteredPositions);
            // const selectedOption = currData.filter((obj) =>
            //     !obj.team_id
            //         ? filteredPositions[0].name === activeTeamId
            //         : obj.team_id === activeTeamId
            // );
            // if (selectedOption.length === 1)
            // setActiveTitle(selectedOption[0].name);
        }
    }, [dataUrl, activeDropdown, fetchedData, activeTeamId, currData]);

    const onSelectHandler = (e) => {
        const targetId = parseInt(e.target.dataset.id);
        if (e.target.dataset.teamid) {
            //for user positions
            const selectedOption = currData.filter(
                (obj) => obj.id === targetId
            );
            if (selectedOption.length === 1)
                setActiveTitle(selectedOption[0].name);
            const teamId = parseInt(e.target.dataset.teamid);
            callbackHandler(teamId, targetId);
            return;
        }

        callbackHandler(targetId);
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
