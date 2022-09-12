import { useEffect, useReducer, useRef } from 'react';
import createAction from '../../../utils/action-creator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserFormInfo } from '../../../store/Form/user-form/user-form.selectors';
import {
    setActiveNames,
    setActiveTeamId,
    setCurrentPositionsData,
    setCurrentTeamsData,
    setFetchedData,
    setFormErrors,
    setUserObject,
} from '../../../store/Form/user-form/user-form.actions';
export const CoworkerInfoService = (setMainData) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [state, dispatch] = useReducer(coworkerReducer, defaultState);
    console.log(selectUserFormInfo());
    const { userObject, formErrors, activeTeamId, fetchedData, teamsCurrData } =
        useSelector(selectUserFormInfo());
    const didMountRef = useRef(false);

    // localStorage logic
    // useEffect(() => {
    //     const persistedState = JSON.parse(
    //         localStorage.getItem('coworker-state')
    //     );
    //     if (persistedState) {
    //         dispatch(
    //             createAction(coworkerTypes.REHYDRATE_STATE, persistedState)
    //         );
    //     }
    // }, []);

    // useEffect(() => {
    //     if (didMountRef.current) {
    //         localStorage.setItem('coworker-state', JSON.stringify(state));
    //     }
    //     didMountRef.current = true;
    // }, [state]);

    // const { userObject, formErrors, activeTeamId, fetchedData, teamsCurrData } =
    //     state;

    useEffect(() => {
        if (activeTeamId) {
            const filteredPositions = fetchedData.positions.filter(
                (obj) => obj.team_id === activeTeamId
            );

            dispatch(setFetchedData(filteredPositions));
        }
    }, [activeTeamId, dispatch, fetchedData.positions]);

    const handleNextRoute = () => {
        navigate('/add-laptop/laptop-specs');
    };

    //////////////////////////////////////////
    ////////////dropdown logic////////////////

    const handleTeamsDropdown = async () => {
        if (!fetchedData.teams.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/teams');
            dispatch(
                setFetchedData({
                    ...fetchedData,
                    teams: data,
                })
            );
            dispatch(setCurrentTeamsData(data));
        }
    };

    const handlePositionsDropdown = async () => {
        if (!fetchedData.positions.length) {
            const {
                data: { data },
            } = await axios('https://pcfy.redberryinternship.ge/api/positions');
            dispatch(
                setFetchedData({
                    ...fetchedData,
                    positions: data,
                })
            );
            if (activeTeamId) {
                const filteredPositions = data.filter(
                    (position) =>
                        activeTeamId && position.team_id === activeTeamId
                );
                dispatch(setCurrentPositionsData(filteredPositions));
                return;
            } else {
                dispatch(setCurrentPositionsData(data));
            }
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
                axios('https://pcfy.redberryinternship.ge/api/teams').then(
                    ({ data: { data } }) => {
                        const [autoSelectTeam] = data.filter(
                            (obj) => obj.id === team_id
                        );
                        dispatch(
                            setActiveNames({
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
