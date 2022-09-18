import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BlueButton } from '../../../shared/blueButton/blue-button.styles';
import { Loader, LoaderContainer } from '../../../shared/loader/loader.styles';
import { fetchLaptopsStart } from '../../../store/laptops/laptopsList/laptopsList.actions';
import { selectLaptopsListReducer } from '../../../store/laptops/laptopsList/laptopsList.selectors';

import {
    LaptopContainer,
    LaptopsListContainer,
    LaptopTextContainer,
    NoLaptopsContainer,
} from './laptops-list.style';

export const LaptopsList = () => {
    const dispatch = useDispatch();
    const { fetchedData, loading } = useSelector(selectLaptopsListReducer);
    const navigate = useNavigate();
    const handleRedirect = () => navigate('/add-laptop/coworker-info');
    useEffect(() => {
        dispatch(fetchLaptopsStart());
    }, [dispatch]);

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
