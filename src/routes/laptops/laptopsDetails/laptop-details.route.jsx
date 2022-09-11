import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThinLine } from '../../../shared/formContainerWrappers/formContainerWrappers';

import { Loader, LoaderContainer } from '../../../shared/loader/loader.styles';
import {
    LaptopDetailsContainer,
    InfoListContainer,
    InfoListItem,
    TwoSidesContainer,
} from './laptop-details.styles';
import { ReactComponent as GELSymbol } from '../../../assets/addLaptop/GEL.svg';
export const LaptopDetails = () => {
    const defaultState = {
        user: {},
        laptop: {},
        extra: {},
        image: '',
    };
    const { id } = useParams();
    const [fetchedData, setFetchedData] = useState(defaultState);
    useEffect(() => {
        if (!Object.keys(fetchedData.user).length) {
            const fetchData = async () => {
                try {
                    const {
                        data: { data },
                    } = await axios(
                        `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=65c73ba7087323760a1a95ac1232f5fe`
                    );
                    const responseBrand = await axios(
                        `https://pcfy.redberryinternship.ge/api/brands`
                    );
                    const positionResponse = await axios(
                        `https://pcfy.redberryinternship.ge/api/positions`
                    );
                    const teamsResponse = await axios(
                        `https://pcfy.redberryinternship.ge/api/teams`
                    );
                    const {
                        user: {
                            team_id,
                            position_id,
                            name,
                            surname,
                            phone_number,
                            email,
                        },
                        laptop: {
                            brand_id,
                            cpu,
                            image,
                            purchase_date,
                            state,
                            price,
                            ram,
                            hard_drive_type,
                        },
                    } = data;
                    const brandName = responseBrand.data.data.find(
                        (brandObj) => brandObj.id === brand_id
                    );

                    const positionName = positionResponse.data.data.find(
                        (positionObj) => positionObj.id === position_id
                    );

                    const teamName = teamsResponse.data.data.find(
                        (teamObj) => teamObj.id === team_id
                    );

                    // re-creating/modifying necessary objects to make them dynamic and iterable enough to use them in JSX
                    const user = {
                        სახელი: name,
                        გვარი: surname,
                        თიმი: teamName.name,
                        პოზიცია: positionName.name,
                        მეილი: email,
                        'ტელ. ნომერი': phone_number,
                    };

                    const laptop = {
                        'ლეპტოპის სახელი': data.laptop.name,
                        'ლეპტოპის ბრენდი': brandName.name,
                        RAM: ram,
                        'მეხსიერების ტიპი': hard_drive_type,
                        CPU: cpu.name,
                        'CPU-ს ბირთვი': cpu.cores,
                        'CPU-ს ნაკადი': cpu.threads,
                    };

                    const extra = {
                        'ლეპტოპის მდგომარეობა':
                            state === 'used' ? 'მეორადი' : 'ახალი',
                        'ლეპტოპის ფასი': price,
                        'შეძენის რიცხვი': !purchase_date
                            ? 'არ არის მითითებული'
                            : purchase_date,
                    };

                    setFetchedData({ user, laptop, extra, image });
                } catch (err) {
                    throw new Error(err);
                }
            };
            fetchData();
        }
    }, [fetchedData, id]);

    const { user, laptop, image, extra } = fetchedData;

    return (
        <>
            {!Object.keys(fetchedData.user).length &&
            !Object.keys(fetchedData.laptop).length ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <>
                    <h1>ლეპტოპის ინფო</h1>
                    <LaptopDetailsContainer>
                        <TwoSidesContainer>
                            <img
                                src={`https://pcfy.redberryinternship.ge/${image}`}
                                alt={laptop.brand}
                            />
                            <InfoListContainer>
                                {Object.keys(user).map((key) => {
                                    return (
                                        <InfoListItem key={key}>
                                            <span>{key}:</span>
                                            <span>{user[key]}</span>
                                        </InfoListItem>
                                    );
                                })}
                            </InfoListContainer>
                        </TwoSidesContainer>
                        <ThinLine />
                        <InfoListContainer>
                            {Object.keys(laptop).map((key) => {
                                return (
                                    <InfoListItem key={key}>
                                        <span>{key}:</span>
                                        <span>{laptop[key]}</span>
                                    </InfoListItem>
                                );
                            })}
                        </InfoListContainer>
                        <ThinLine />
                        <InfoListContainer>
                            {Object.keys(extra).map((key) => {
                                return (
                                    <InfoListItem key={key}>
                                        <span>{key}:</span>
                                        <span>
                                            {extra[key]}
                                            {key === 'ლეპტოპის ფასი' ? (
                                                <GELSymbol />
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </InfoListItem>
                                );
                            })}
                        </InfoListContainer>
                    </LaptopDetailsContainer>
                </>
            )}
        </>
    );
};

export default LaptopDetails;
