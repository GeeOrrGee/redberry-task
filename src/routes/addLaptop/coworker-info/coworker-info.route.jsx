import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    FormContainer,
    MultipleInputContainer,
    RouteButtonsContainer,
} from './coworker-info.styles';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';
import axios from 'axios';

export const CoworkerInfo = () => {
    const defaultForm = {
        name: '',
        surname: '',
        team_id: 0,
        position_id: 0,
        email: '',
        number: '',
    };

    const defaultData = {
        teams: [],
        positions: [],
    };

    const defaultNames = {
        positions: 'პოზიციები',
        teams: 'თიმი',
    };
    const navigate = useNavigate();
    const [userObject, setUserObject] = useState(defaultForm);
    const [formErrors, setFormErrors] = useState([]);
    const [activeTeamId, setActiveTeamId] = useState(0);
    const [fetchedData, setFetchedData] = useState(defaultData);
    const [teamsCurrData, setTeamsCurrData] = useState([]);
    const [positionsCurrData, setPositionsCurrData] = useState([]);
    const [activeNames, setActiveNames] = useState(defaultNames);

    useEffect(() => {
        if (activeTeamId) {
            const filteredPositions = fetchedData.positions.filter(
                (obj) => obj.team_id === activeTeamId
            );
            setPositionsCurrData(filteredPositions);
        }
        // console.log(positionsCurrData);
    }, [activeTeamId, fetchedData]);

    const handleNextRoute = () => {
        navigate('/add-laptop/laptop-specs');
    };

    const handlePrevRoute = () => {
        navigate(-1);
    };

    const handleTeamsDropdown = async () => {
        if (!fetchedData.teams.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/teams');
            setFetchedData({ ...fetchedData, teams: data });
            setTeamsCurrData(data);
        }
    };

    const handlePositionsDropdown = async () => {
        if (!fetchedData.positions.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/positions');
            setFetchedData({ ...fetchedData, positions: data });
            if (activeTeamId) {
                console.log('ss');
                const filteredPositions = data.filter(
                    (position) =>
                        activeTeamId && position.team_id === activeTeamId
                );
                setPositionsCurrData(filteredPositions);
                return;
            } else {
                console.log('ss');
                setPositionsCurrData(data);
            }
        }
    };

    const handleDropdownSelect = (dataObj) => {
        if (formErrors.includes('team_id')) {
            setFormErrors(formErrors.filter((err) => err !== 'team_id'));
        }
        if (dataObj?.team_id) {
            const { team_id, id, name } = dataObj;
            if (formErrors.includes('position_id')) {
                setFormErrors(
                    formErrors.filter(
                        (err) => err !== 'position_id' && err !== 'team_id'
                    )
                );
            }
            setUserObject({ ...userObject, team_id, position_id: id });
            setActiveTeamId(team_id);
            if (!teamsCurrData.length) {
                axios('https://pcfy.redberryinternship.ge/api/teams').then(
                    ({ data: { data } }) => {
                        const [autoSelectTeam] = data.filter(
                            (obj) => obj.id === team_id
                        );
                        setActiveNames({
                            teams: autoSelectTeam.name,
                            positions: name,
                        });
                    }
                );
            } else {
                const [autoSelectTeam] = teamsCurrData.filter(
                    (obj) => obj.id === team_id
                );
                console.log(name);
                setActiveNames({
                    teams: autoSelectTeam?.name,
                    positions: name,
                });
            }

            return;
        } else if (!dataObj?.team_id) {
            const { id, name } = dataObj;
            setUserObject({ ...userObject, team_id: id, position_id: 0 });
            setActiveTeamId(id);
            setActiveNames({ positions: 'პოზიციები', teams: name });

            return;
        }
    };
    const formValidation = () => {
        const fields = Object.keys(userObject);

        const errorArray = fields.filter((field) => {
            const value = userObject[field];
            console.log(field, !value);
            if (!value) return !value;

            if (field === 'name' || field === 'surname') {
                const validLength = value.length >= 2;
                const isGeorgian = value.match(/^[ა-ჰ]+$/);

                const validity = isGeorgian && validLength;
                return !validity;
            }

            if (field === 'email') {
                const lastPart = value.substring(value.length - 12);
                const validEmail =
                    lastPart === '@redberry.ge' &&
                    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); //prevents multiple @ symbols

                return !validEmail;
            }

            if (field === 'number') {
                const notNumber = isNaN(parseInt(value.substring(1)));
                const georgianNumber = value.slice(0, 5) === '+9955';
                const validLength = value.substring(4).length === 9;
                const validInput = georgianNumber && validLength && !notNumber;
                console.log(validInput);
                return !validInput;
            }

            return !userObject[field];
        });

        return errorArray;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const invalidFieldsArray = formValidation();
        console.log(invalidFieldsArray);
        if (invalidFieldsArray.length) {
            setFormErrors(invalidFieldsArray);
            return;
        }
        console.log(userObject);
        handleNextRoute();

        //post request
    };

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        const value = e.target.value;
        setUserObject({ ...userObject, [inputType]: value });
        if (formErrors.includes(inputType)) {
            setFormErrors(formErrors.filter((err) => err !== inputType));
        }
    };

    return (
        <FormContainer onSubmit={onSubmitHandler}>
            <MultipleInputContainer>
                <FormInput
                    content={'მინიმუმ 2 სიმბოლო, ქართული ასოები'}
                    value={userObject.name}
                    label='სახელი'
                    name={'name'}
                    placeholder='გრიშა'
                    onChange={handleInputChange}
                    type='text'
                    errorState={formErrors.includes('name')}
                    required
                />
                <FormInput
                    label='გვარი'
                    content={'მინიმუმ 2 სიმბოლო, ქართული ასოები'}
                    name={'surname'}
                    onChange={handleInputChange}
                    value={userObject.surname}
                    errorState={formErrors.includes('surname')}
                    placeholder='ბაგრატიონი'
                    required
                />
            </MultipleInputContainer>
            <Dropdown
                name={activeNames.teams}
                callbackHandler={handleTeamsDropdown}
                errorState={formErrors.includes('team_id')}
                data={teamsCurrData}
                onSelectHandler={handleDropdownSelect}
            />
            <Dropdown
                name={activeNames.positions}
                callbackHandler={handlePositionsDropdown}
                errorState={formErrors.includes('position_id')}
                data={positionsCurrData}
                onSelectHandler={handleDropdownSelect}
            />

            <FormInput
                name={'email'}
                content={'უნდა მთავრდებოდეს @redberry.ge-ით'}
                value={userObject.email}
                label='მეილი'
                onChange={handleInputChange}
                errorState={formErrors.includes('email')}
                placeholder='ბაგრატიონი'
                type='email'
                required
            />

            <FormInput
                name={'number'}
                content={'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}
                label='ტელეფონის ნომერი'
                onChange={handleInputChange}
                errorState={formErrors.includes('number')}
                value={`${userObject.number}`}
                placeholder='ბაგრატიონი'
                type='text'
                required
            />

            <RouteButtonsContainer>
                <div>
                    <BlueButton type='submit'>შემდეგი</BlueButton>
                </div>
            </RouteButtonsContainer>
        </FormContainer>
    );
};
