import { useEffect, useReducer, useRef } from 'react';
import createAction from '../../../utils/action-creator';
import { useNavigate } from 'react-router-dom';
import coworkerTypes from './coworker-info-actionTypes';
import coworkerReducer from './coworker-info.reducer';
import { defaultState } from './coworker-info.reducer';
import axios from 'axios';
export const CoworkerInfoService = (setMainDataObject, mainDataObject) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(coworkerReducer, defaultState);
    const didMountRef = useRef(false);
    useEffect(() => {
        const persistedState = JSON.parse(
            localStorage.getItem('coworker-state')
        );
        if (persistedState) {
            dispatch(
                createAction(coworkerTypes.REHYDRATE_STATE, persistedState)
            );
        }
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem('coworker-state', JSON.stringify(state));
        }
        didMountRef.current = true;
    }, [state]);

    const { userObject, formErrors, activeTeamId, fetchedData, teamsCurrData } =
        state;

    useEffect(() => {
        if (activeTeamId) {
            const filteredPositions = fetchedData.positions.filter(
                (obj) => obj.team_id === activeTeamId
            );

            dispatch(
                createAction(
                    coworkerTypes.SET_CURR_POSITIONS_DATA,
                    filteredPositions
                )
            );
        }
    }, [activeTeamId, fetchedData]);

    const handleNextRoute = () => {
        navigate('/add-laptop/laptop-specs');
    };

    const handleTeamsDropdown = async () => {
        if (!fetchedData.teams.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/teams');
            dispatch(
                createAction(coworkerTypes.SET_FETCHED_DATA, {
                    ...fetchedData,
                    teams: data,
                })
            );
            dispatch(createAction(coworkerTypes.SET_CURR_TEAMS_DATA, data));
        }
    };

    const handlePositionsDropdown = async () => {
        if (!fetchedData.positions.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/positions');
            dispatch(
                createAction(coworkerTypes.SET_FETCHED_DATA, {
                    ...fetchedData,
                    positions: data,
                })
            );
            if (activeTeamId) {
                const filteredPositions = data.filter(
                    (position) =>
                        activeTeamId && position.team_id === activeTeamId
                );
                dispatch(
                    createAction(
                        coworkerTypes.SET_CURR_POSITIONS_DATA,
                        filteredPositions
                    )
                );
                return;
            } else {
                dispatch(
                    createAction(coworkerTypes.SET_CURR_POSITIONS_DATA, data)
                );
            }
        }
    };

    const handleDropdownSelect = (dataObj) => {
        if (formErrors.includes('team_id')) {
            dispatch(
                createAction(
                    coworkerTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== 'team_id')
                )
            );
        }
        if (dataObj?.team_id) {
            const { team_id, id, name } = dataObj;
            if (formErrors.includes('position_id')) {
                dispatch(
                    createAction(
                        coworkerTypes.SET_FORM_ERRORS,
                        formErrors.filter(
                            (err) => err !== 'position_id' && err !== 'team_id'
                        )
                    )
                );
            }
            dispatch(
                createAction(coworkerTypes.SET_USER_OBJECT, {
                    ...userObject,
                    team_id,
                    position_id: id,
                })
            );

            dispatch(createAction(coworkerTypes.SET_ACTIVE_TEAM_ID, team_id));
            if (!teamsCurrData.length) {
                axios('https://pcfy.redberryinternship.ge/api/teams').then(
                    ({ data: { data } }) => {
                        const [autoSelectTeam] = data.filter(
                            (obj) => obj.id === team_id
                        );
                        dispatch(
                            createAction(coworkerTypes.SET_ACTIVE_NAMES, {
                                teams: autoSelectTeam.name,
                                positions: name,
                            })
                        );
                    }
                );
            } else {
                const [autoSelectTeam] = teamsCurrData.filter(
                    (obj) => obj.id === team_id
                );

                dispatch(
                    createAction(coworkerTypes.SET_ACTIVE_NAMES, {
                        teams: autoSelectTeam.name,
                        positions: name,
                    })
                );
            }

            return;
        } else if (!dataObj?.team_id) {
            const { id, name } = dataObj;
            dispatch(
                createAction(coworkerTypes.SET_USER_OBJECT, {
                    ...userObject,
                    team_id: id,
                    position_id: 0,
                })
            );
            dispatch(createAction(coworkerTypes.SET_ACTIVE_TEAM_ID, id));
            dispatch(
                createAction(coworkerTypes.SET_ACTIVE_NAMES, {
                    teams: name,
                    positions: 'პოზიციები',
                })
            );
            return;
        }
    };

    // validates each form input cases and returns formError array as an error buffer array
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
                    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); //prevents multiple @ symbols

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
            dispatch(
                createAction(coworkerTypes.SET_FORM_ERRORS, invalidFieldsArray)
            );
            return;
        }

        setMainDataObject({ ...mainDataObject, ...userObject });
        handleNextRoute();

        //post request
    };

    const handleInputChange = (e) => {
        const inputType = e.target.name;
        const value =
            inputType === 'phone_number'
                ? e.target.value.trim()
                : e.target.value;
        dispatch(
            createAction(coworkerTypes.SET_USER_OBJECT, {
                ...userObject,
                [inputType]: value,
            })
        );
        if (formErrors.includes(inputType)) {
            dispatch(
                createAction(
                    coworkerTypes.SET_FORM_ERRORS,
                    formErrors.filter((err) => err !== inputType)
                )
            );
        }
    };

    return {
        handleDropdownSelect,
        onSubmitHandler,
        handleInputChange,
        handlePositionsDropdown,
        handleTeamsDropdown,
        state,
    };
};
