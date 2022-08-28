import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    CoworkerInfoContainer,
    FormContainer,
    InputField,
    InputLabelWrapper,
    Label,
    MultipleInputContainer,
    NavlinksContainer,
} from './coworker-info.styles';

export const CoworkerInfo = () => {
    const defaultState = {
        teams: [],
        positions: [],
    };
    const [fetchedData, setFetchedData] = useState(defaultState);
    const [activeTeamId, setActiveTeamId] = useState();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const teams = await axios(
    //             'https://pcfy.redberryinternship.ge/api/teams'
    //         );
    //         const positions = await axios(
    //             'https://pcfy.redberryinternship.ge/api/positions'
    //         );
    //     };

    //     fetchData();
    // }, []);

    const handleTeamsDropdown = async () => {
        const {
            data: { data },
        } = await axios('https://pcfy.redberryinternship.ge/api/teams');
        setFetchedData({ ...fetchedData, teams: data });
    };

    const handlePositionsDropdown = async () => {
        const {
            data: { data },
        } = await axios('https://pcfy.redberryinternship.ge/api/positions');
        const filteredPositions = data.filter((position) =>
            activeTeamId === null ? position : position.team_id === activeTeamId
        );

        setFetchedData({ ...fetchedData, positions: filteredPositions });
    };

    return (
        <FormContainer>
            <MultipleInputContainer>
                <InputLabelWrapper>
                    <Label>სახელი</Label>
                    <InputField placeholder='გრიშა' />
                </InputLabelWrapper>
                <InputLabelWrapper>
                    <Label>გვარი</Label>
                    <InputField placeholder='ბაგრატიონი' />
                </InputLabelWrapper>
            </MultipleInputContainer>
        </FormContainer>
    );
};
