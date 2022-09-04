import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, LoaderContainer } from '../../../shared/loader/loader.styles';

import {
    LaptopContainer,
    LaptopsListContainer,
    LaptopTextContainer,
} from './laptops-list.style';

export const LaptopsList = () => {
    const [fetchedData, setFetechedData] = useState([]);
    useEffect(() => {
        if (!fetchedData.length) {
            try {
                axios(
                    `https://pcfy.redberryinternship.ge/api/laptops?token=${'d7aa0f4140e9ce11f81c9622c4d84673'}`
                ).then(({ data: { data } }) => {
                    setFetechedData(data);
                });
            } catch (err) {
                alert(err);
                throw new Error();
            }
        }
    }, [fetchedData]);

    return (
        <>
            {!fetchedData.length ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <>
                    <h1>ჩანაწერების სია</h1>
                    <LaptopsListContainer>
                        {fetchedData.map((laptop) => {
                            const {
                                user,
                                laptop: { name, id, image },
                            } = laptop;
                            return (
                                <LaptopContainer>
                                    <div>
                                        <img
                                            src={`https://pcfy.redberryinternship.ge/${image}`}
                                            alt={laptop.name}
                                        />
                                    </div>
                                    <LaptopTextContainer>
                                        <div>
                                            <span>{`${user.name} ${user.surname}`}</span>
                                            <span>{name}</span>
                                        </div>
                                        <Link to={`/laptops/${id}`}>
                                            მეტის ნახვა
                                        </Link>
                                    </LaptopTextContainer>
                                </LaptopContainer>
                            );
                        })}
                    </LaptopsListContainer>
                </>
            )}
        </>
    );
};

export default LaptopsList;
