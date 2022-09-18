import { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaptopDetailsStart } from '../../../store/laptops/laptopDetails/laptopDetails.actions';
import { selectLaptopDetails } from '../../../store/laptops/laptopDetails/laptopDetails.selectors';
export const LaptopDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLaptopDetailsStart(id));
    }, [dispatch, id]);
    const { fetchedData, loading } = useSelector(selectLaptopDetails);
    const { user, laptop, image, extra } = fetchedData;

    return (
        <>
            {loading ? (
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
