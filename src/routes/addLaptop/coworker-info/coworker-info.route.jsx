import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Vector } from '../../../assets/addLaptop/Vector.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    CoworkerInfoContainer,
    DropdownField,
    FormContainer,
    InputField,
    InputLabelWrapper,
    Label,
    MultipleInputContainer,
    NavlinksContainer,
    OptionsContainer,
    RouteButtonsContainer,
} from './coworker-info.styles';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';

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

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        const value = e.target.value;

        //validations
        if (inputType === 'email') {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.com/;
            console.log(
                ',,sss,,s@redberry,com'.match(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry.com/
                ) //TODO validate this in handleNextRoute(), finish the forms TODAY
            );
            return regex.test(value)
                ? setUserObject({ ...userObject, [inputType]: value })
                : Error;
        } else if (inputType === 'number') {
        }

        setUserObject({ ...userObject, [inputType]: value });
    };

    return (
        <FormContainer>
            <MultipleInputContainer>
                <InputLabelWrapper
                    content={'მინიმუმ 2 სიმბოლო, ქართული ასოები'}
                >
                    <Label>სახელი</Label>
                    <InputField
                        value={userObject.name}
                        name='name'
                        onChange={handleInputChange}
                        placeholder='გრიშა'
                    />
                </InputLabelWrapper>
                <InputLabelWrapper
                    content={'მინიმუმ 2 სიმბოლო, ქართული ასოები'}
                >
                    <Label>გვარი</Label>
                    <InputField
                        name='surname'
                        onChange={handleInputChange}
                        value={userObject.surname}
                        placeholder='ბაგრატიონი'
                    />
                </InputLabelWrapper>
            </MultipleInputContainer>
            <Dropdown
                name={'თიმი'}
                activeTeamId={activeTeamId}
                setActiveTeamId={setActiveTeamId}
                dataUrl='https://pcfy.redberryinternship.ge/api/teams'
                callbackHandler={handleDropdownSelect}
            />
            <Dropdown
                name={'პოზიციები'}
                dataUrl='https://pcfy.redberryinternship.ge/api/positions'
                activeTeamId={activeTeamId}
                setActiveTeamId={setActiveTeamId}
                callbackHandler={handleDropdownSelect}
            />

            <InputLabelWrapper content={'უნდა მთავრდებოდეს @redberry.ge-ით'}>
                <Label>მეილი</Label>
                <InputField
                    value={userObject.email}
                    name='email'
                    onChange={handleInputChange}
                    placeholder='ბაგრატიონი'
                    content={'უნდა მთავრდებოდეს @redberry.ge-ით'}
                />
            </InputLabelWrapper>
            <InputLabelWrapper
                content={'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}
            >
                <Label>ტელეფონის ნომერი</Label>
                <InputField
                    name='number'
                    onChange={handleInputChange}
                    value={userObject.number}
                    placeholder='ბაგრატიონი'
                    content={'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}
                />
            </InputLabelWrapper>

            <RouteButtonsContainer>
                <div>
                    <BlueButton onClick={handleNextRoute}>შემდეგი</BlueButton>
                </div>
            </RouteButtonsContainer>
        </FormContainer>
    );
};
