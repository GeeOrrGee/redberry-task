import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { CoworkerInfo } from './coworker-info/coworker-info.route';
import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import {
    AddLaptopContainer,
    NavlinksContainer,
    VectorContainer,
} from './add-laptop.styles';
import { useEffect, useRef, useState } from 'react';
import LaptopInfo from './laptop-info/laptop-info.route';
import axios from 'axios';
import { Loader, LoaderContainer } from '../../shared/loader/loader.styles';
import { SuccessModal } from '../../components/SuccessModal/success-modal.component';
export const AddLaptop = () => {
    const didMountRef = useRef(false);
    const navigate = useNavigate();
    const [mobileState, setMobileState] = useState(false);
    const [mainDataObject, setMainDataObject] = useState('');
    const [sendData, setSendData] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const [counter, setCounter] = useState('');

    const currUrl = window.location.pathname;
    useEffect(() => {
        const currentStep =
            currUrl.substring(currUrl.lastIndexOf('/') + 1) === 'coworker-info'
                ? 1
                : 2;
        setCounter(currentStep);
    }, [currUrl]);

    useEffect(() => {
        const postRequest = async () => {
            try {
                const fd = new FormData();
                Object.keys(mainDataObject).forEach((key) => {
                    fd.append(key, mainDataObject[key]);
                });

                fd.append('token', '50dcd22954afc48fb27baea0666d845c');
                await axios.postForm(
                    'https://pcfy.redberryinternship.ge/api/laptop/create',
                    fd
                );
                setLoadingState(false);
                setSendData(true);
            } catch (err) {
                throw new Error(err);
            }
        };
        if (loadingState) {
            postRequest();
        }
    }, [mainDataObject, loadingState]);

    useEffect(() => {
        if (didMountRef.current && mainDataObject) {
            const persistedObjConfig = {
                persistedMainDataObject: mainDataObject,
                persistedSendDataState: sendData,
            };

            localStorage.setItem(
                'add-laptop-state',
                JSON.stringify(persistedObjConfig)
            );
        }
        didMountRef.current = true;
    }, [sendData, loadingState, mainDataObject]);

    //handling mobile navigation side effects
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
        const savedProgress = JSON.parse(
            localStorage.getItem('add-laptop-state')
        );
        if (savedProgress) {
            const { persistedMainDataObject, persistedSendDataState } =
                savedProgress;

            setSendData(persistedSendDataState);
            setMainDataObject(persistedMainDataObject);
        }
    }, [navigate]);

    const prevRoute = () => navigate(-1);
    return (
        <>
            {loadingState && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}

            <AddLaptopContainer>
                {!sendData ? (
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
                                    <CoworkerInfo
                                        mainDataObject={mainDataObject}
                                        setMainDataObject={setMainDataObject}
                                    />
                                }
                            />
                            <Route
                                path='/laptop-specs'
                                element={
                                    <LaptopInfo
                                        mainDataObject={mainDataObject}
                                        setMainDataObject={setMainDataObject}
                                        setSendData={setSendData}
                                        setLoadingState={setLoadingState}
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
