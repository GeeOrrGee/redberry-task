import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../../store/Form/user-form/user-form.selectors';
import {
    setActiveNames,
    setActiveTeamId,
    setCurrentPositionsData,
    setFormErrors,
    setUserObject,
    fetchPositionsStart,
    fetchTeamsStart,
} from '../../../store/Form/user-form/user-form.actions';

export const CoworkerInfoService = (setMainData) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userObject, formErrors, activeTeamId, fetchedData, teamsCurrData } =
        useSelector(selectUserInfo);

    useEffect(() => {
        if (activeTeamId && teamsCurrData.length) {
            const { name } = teamsCurrData.find(
                (obj) => obj.id === activeTeamId
            );
            dispatch(setActiveNames({ teams: name }));
        }
    }, [activeTeamId, teamsCurrData, dispatch]);
    useEffect(() => {
        if (activeTeamId) {
            const filteredPositions = fetchedData.positions?.filter(
                (obj) => obj.team_id === activeTeamId
            );

            dispatch(setCurrentPositionsData(filteredPositions));
        }
    }, [activeTeamId, dispatch, fetchedData]);

    const handleNextRoute = () => {
        navigate('/add-laptop/laptop-specs');
    };

    //////////////////////////////////////////
    ////////////dropdown logic////////////////

    const handleTeamsDropdown = async () => {
        if (!fetchedData.teams.length) {
            dispatch(
                fetchTeamsStart('https://pcfy.redberryinternship.ge/api/teams')
            );
        }
    };

    const handlePositionsDropdown = async () => {
        if (!fetchedData.positions.length) {
            dispatch(
                fetchPositionsStart(
                    'https://pcfy.redberryinternship.ge/api/positions'
                )
            );
        }
    };

    const handleDropdownSelect = (dataObj) => {
        if (formErrors.includes('team_id')) {
            dispatch(
                setFormErrors(formErrors.filter((err) => err !== 'team_id'))
            );
        }
        if (dataObj?.team_id) {
            const { team_id, id, name } = dataObj;
            if (formErrors.includes('position_id')) {
                dispatch(
                    setFormErrors(
                        formErrors.filter(
                            (err) => err !== 'position_id' && err !== 'team_id'
                        )
                    )
                );
            }
            dispatch(
                setUserObject({
                    ...userObject,
                    team_id,
                    position_id: id,
                })
            );

            dispatch(setActiveTeamId(team_id));
            if (!teamsCurrData.length) {
                dispatch(
                    fetchTeamsStart(
                        'https://pcfy.redberryinternship.ge/api/teams'
                    )
                );
                dispatch(
                    setActiveNames({
                        positions: name,
                    })
                );
            } else {
                const [autoSelectTeam] = teamsCurrData.filter(
                    (obj) => obj.id === team_id
                );

                dispatch(
                    setActiveNames({
                        teams: autoSelectTeam.name,
                        positions: name,
                    })
                );
            }

            return;
        } else if (!dataObj?.team_id) {
            const { id, name } = dataObj;
            dispatch(
                setUserObject({
                    ...userObject,
                    team_id: id,
                    position_id: 0,
                })
            );
            dispatch(setActiveTeamId(id));
            dispatch(
                setActiveNames({
                    teams: name,
                    positions: 'პოზიციები',
                })
            );
            return;
        }
    };

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        const value =
            inputType === 'phone_number'
                ? e.target.value.trim()
                : e.target.value;
        dispatch(
            setUserObject({
                ...userObject,
                [inputType]: value,
            })
        );
        if (formErrors.includes(inputType)) {
            dispatch(
                setFormErrors(formErrors.filter((err) => err !== inputType))
            );
        }
    };
    // validates each form input cases and returns formError array as an error buffer
    const formValidation = () => {
        const fields = Object.keys(userObject);

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
                const lastPart = value.substring(value.length - 12);
                const validEmail =
                    lastPart === '@redberry.ge' &&
                    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

                return !validEmail;
            }

            if (field === 'phone_number') {
                const notNumber = isNaN(parseInt(value.substring(1)));
                const georgianNumber = value.slice(0, 5) === '+9955';
                const validLength = value.substring(4).length === 9;
                const validInput = georgianNumber && validLength && !notNumber;

                return !validInput;
            }

            return !userObject[field];
        });

        return errorArray;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const invalidFieldsArray = formValidation();
        if (invalidFieldsArray.length) {
            dispatch(setFormErrors(invalidFieldsArray));
            return;
        }

        setMainData({ ...userObject }); // parent callback
        handleNextRoute();
    };

    return {
        handleDropdownSelect,
        onSubmitHandler,
        handleInputChange,
        handlePositionsDropdown,
        handleTeamsDropdown,
    };
};
