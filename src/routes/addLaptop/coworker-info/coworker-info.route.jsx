import {
    FormContainer,
    MultipleInputContainer,
} from '../../../shared/formContainerWrappers/formContainerWrappers.js';
import { RouteButtonsContainer } from '../../../shared/formContainerWrappers/formContainerWrappers.js';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Dropdown } from '../../../components/Dropdown/dropdown.component';
import { FormInput } from '../../../components/InputField/input-field.component';

import { CoworkerInfoService } from './coworker-info.service.js';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../store/Form/user-form/user-form.selectors.js';
export const CoworkerInfo = ({ setMainData }) => {
    const {
        handleDropdownSelect,
        onSubmitHandler,
        handleInputChange,
        handlePositionsDropdown,
        handleTeamsDropdown,
    } = CoworkerInfoService(setMainData);

    const userFormState = useSelector(selectUserInfo);

    const {
        userObject,
        formErrors,
        teamsCurrData,
        activeNames,
        positionsCurrData,
    } = userFormState;

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
                name={'phone_number'}
                content={'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}
                label='ტელეფონის ნომერი'
                onChange={handleInputChange}
                errorState={formErrors.includes('phone_number')}
                value={`${userObject.phone_number}`}
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
