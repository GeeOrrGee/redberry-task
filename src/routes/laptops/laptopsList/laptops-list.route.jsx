import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Loader, LoaderContainer } from '../../../shared/loader/loader.styles';

import {
    LaptopContainer,
    LaptopsListContainer,
    LaptopTextContainer,
    NoLaptopsContainer,
} from './laptops-list.style';

export const LaptopsList = () => {
    const [fetchedData, setFetechedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleRedirect = () => navigate('/add-laptop/coworker-info');
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {
                    data: { data },
                } = await axios(
                    `https://pcfy.redberryinternship.ge/api/laptops?token=${'65c73ba7087323760a1a95ac1232f5fe'}`
                );
                console.log(data);
                setFetechedData(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        })();
    }, []);

    return (
        <>
            {loading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <>
                    <h1>ჩანაწერების სია</h1>
                    {fetchedData.length ? (
                        <>
                            <LaptopsListContainer>
                                {fetchedData.map((laptop) => {
                                    const {
                                        user,
                                        laptop: { name, id, image },
                                    } = laptop;
                                    return (
                                        <LaptopContainer key={id}>
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
                    ) : (
                        <NoLaptopsContainer>
                            <p>ჩანაწერები არ არის</p>
                            <BlueButton onClick={handleRedirect}>
                                ჩანაწერის დამატება
                            </BlueButton>
                        </NoLaptopsContainer>
                    )}
                </>
            )}
        </>
    );
};

export default LaptopsList;
