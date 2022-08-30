import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    FormContainer,
    MultipleInputContainer,
    RouteButtonsContainer,
} from './coworker-info.styles';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';

export const CoworkerInfo = () => {
    const defaultState = {
        name: '',
        surname: '',
        team_id: 0,
        position_id: 0,
        email: '',
        number: '',
    };

    const navigate = useNavigate();
    const [userObject, setUserObject] = useState(defaultState);
    const [formErrors, setFormErrors] = useState([]);
    const [activeTeamId, setActiveTeamId] = useState(0);

    const handleNextRoute = () => {
        navigate('/add-laptop/laptop-specs');
    };

    const handlePrevRoute = () => {
        navigate(-1);
    };

    const handleDropdownSelect = (team_id = 0, position_id = 0) => {
        setUserObject({ ...userObject, team_id, position_id });
        setActiveTeamId(team_id);
    };

    // const handleTeamsDropdown =  () => {v

    // };

    // const handlePositionsDropdown = async () => {
    //     const {
    //         data: { data },
    //     } = await axios('https://pcfy.redberryinternship.ge/api/positions');
    //     const filteredPositions = data.filter((position) =>
    //         activeTeamId === null ? position : position.team_id === activeTeamId
    //     );

    // };

    const formValidation = () => {
        const fields = Object.keys(userObject);
        // const emptyFields = fields.filter((key) => !userObject[key]);

        const errorArray = fields.filter((field) => {
            const value = userObject[field];
            if (!value) return !value;

            if (field === 'name' || field === 'surname') {
                const validLength = value.length >= 2;
                const isGeorgian = value.match(/^[ა-ჰ]+$/);

                const validity = isGeorgian && validLength;
                return !validity;
            }

            if (field === 'email') {
                const lastPart = value.substring(value.length - 13);
                const validEmail =
                    lastPart === '@redberry.com' &&
                    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); //prevents multiple @ symbols

                return !validEmail;
            }

            if (field === 'number') {
                const notNumber = isNaN(parseInt(value.substring(1)));
                const georgianNumber = value.slice(0, 5) === '+9955';
                const validLength = value.substring(4).length === 9;
                const validInput = georgianNumber && validLength && !notNumber;
                return !validInput;
            }
        });

        return errorArray;
    };

    // console.log(Object.keys(userObject).filter((key) => !userObject[key]));
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const invalidFieldsArray = formValidation();
        if (invalidFieldsArray.length) {
            setFormErrors(invalidFieldsArray);
            console.log(formErrors);
            return;
        }
        handleNextRoute();

        //post request
    };

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        const value = e.target.value;
        const invalidFieldsArray = formValidation();
        if (invalidFieldsArray.length) {
            setFormErrors(invalidFieldsArray);
            console.log(formErrors);
            return;
        }

        //validations
        setUserObject({ ...userObject, [inputType]: value });
        console.log(formErrors);
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
                name={'თიმი'}
                activeTeamId={activeTeamId}
                setActiveTeamId={setActiveTeamId}
                dataUrl='https://pcfy.redberryinternship.ge/api/teams'
                callbackHandler={handleDropdownSelect}
                errorState={formErrors.includes('team_id')}
            />
            <Dropdown
                name={'პოზიციები'}
                dataUrl='https://pcfy.redberryinternship.ge/api/positions'
                activeTeamId={activeTeamId}
                setActiveTeamId={setActiveTeamId}
                callbackHandler={handleDropdownSelect}
                errorState={formErrors.includes('position_id')}
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
