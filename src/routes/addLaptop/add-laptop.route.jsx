import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { CoworkerInfo } from './coworker-info/coworker-info.route';
import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import {
    AddLaptopContainer,
    NavlinksContainer,
    VectorContainer,
} from './add-laptop.styles';
import { useEffect, useState } from 'react';
import LaptopInfo from './laptop-info/laptop-info.route';
import { Loader, LoaderContainer } from '../../shared/loader/loader.styles';
import { SuccessModal } from '../../components/SuccessModal/success-modal.component';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectFormLoading,
    selectMainObject,
    selectSentData,
} from '../../store/Form/form-global/globalForm.selectors';
import {
    sendPostRequest,
    setDefault,
    setMainObject,
} from '../../store/Form/form-global/globalForm-actions';
export const AddLaptop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileState, setMobileState] = useState(false);
    const [counter, setCounter] = useState('');

    //selectors
    const sentData = useSelector(selectSentData);
    const loadingState = useSelector(selectFormLoading);
    const mainObject = useSelector(selectMainObject);
    //dispatch callbacks
    const sendRequest = () => dispatch(sendPostRequest());
    const setMainData = (data) => dispatch(setMainObject(data));

    const currUrl = window.location.pathname;
    useEffect(() => {
        const currentStep =
            currUrl.substring(currUrl.lastIndexOf('/') + 1) === 'coworker-info'
                ? 1
                : 2;
        setCounter(currentStep);
    }, [currUrl]);

    useEffect(() => {
        return () => dispatch(setDefault());
    }, [dispatch]);

    useEffect(() => {
        const renderRedberryLogo = () => {
            const getCurrentWidth = window.innerWidth;
            if (getCurrentWidth < 801) {
                setMobileState(true);
            } else if (getCurrentWidth > 800) {
                setMobileState(false);
            }
        };

        renderRedberryLogo();

        window.addEventListener('resize', () => renderRedberryLogo());

        return window.removeEventListener('resize', () => renderRedberryLogo());
    }, [mobileState]);

    useEffect(() => {
        const currUrl =
            window.location.pathname.substring(
                window.location.pathname.lastIndexOf('/') + 1
            ) === 'laptop-specs';
        if (!mainObject.email && currUrl) {
            navigate('/add-laptop/coworker-info');
        }
    }, [mainObject, navigate]);

    const prevRoute = () => navigate(-1);
    return (
        <>
            {loadingState && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}

            <AddLaptopContainer>
                {!sentData ? (
                    <>
                        {' '}
                        {
                            <VectorContainer onClick={prevRoute}>
                                <Vector />
                            </VectorContainer>
                        }
                        <NavlinksContainer>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'active-inner-navlink' : ''
                                }
                                to='/add-laptop/coworker-info'
                            >
                                თანამშრომლის ინფო
                            </NavLink>
                            <NavLink
                                to='/add-laptop/laptop-specs'
                                className={({ isActive }) =>
                                    isActive ? 'active-inner-navlink' : ''
                                }
                            >
                                ლეპტოპის მახასიათებლები
                            </NavLink>
                        </NavlinksContainer>
                        {mobileState && <p>{counter}/2</p>}
                        <Routes>
                            <Route
                                path='/coworker-info'
                                element={
                                    <CoworkerInfo setMainData={setMainData} />
                                }
                            />
                            <Route
                                path='/laptop-specs'
                                element={
                                    <LaptopInfo
                                        setMainData={setMainData}
                                        sendRequest={sendRequest}
                                        mobileState={mobileState}
                                    />
                                }
                            />
                        </Routes>
                        {!mobileState && (
                            <div>
                                <img
                                    src={require('../../assets/addLaptop/LOGO-10 2.png')}
                                    alt='logo'
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <SuccessModal></SuccessModal>
                )}
            </AddLaptopContainer>
        </>
    );
};
