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
//TODO extract data from childroutes, add conditional step increment based on the routes and add the last form page
export const AddLaptop = () => {
    const defaultDataState = { user: {}, laptop: {} };
    const navigate = useNavigate();
    const [mobileState, setMobileState] = useState(true);
    const [mainDataObject, setMainDataObject] = useState(defaultDataState);
    const [counter, setCounter] = useState(1);
    // console.log(redberrmobiyState);

    useEffect(() => {
        // setCounter(2);
    }, [mainDataObject, counter]); //steps counter for mobileNav

    useEffect(() => {
        const persistedObjConfig = {
            persistedMobileState: mobileState,
            persistedMainDataObject: mainDataObject,
            persistedCounter: counter,
        };

        localStorage.setItem(
            'add-laptop-state',
            JSON.stringify(persistedObjConfig)
        );
    }, [counter, mainDataObject, mobileState]);

    //handling mobile navigation side effects
    useEffect(() => {
        const renderRedberryLogo = () => {
            const getCurrentWidth = window.innerWidth;
            if (getCurrentWidth < 801 && mobileState) {
                setMobileState(false);
            } else if (getCurrentWidth > 800 && !mobileState) {
                setMobileState(true);
            }
        };
        renderRedberryLogo();
        window.addEventListener('resize', () => renderRedberryLogo());

        return window.removeEventListener('resize', () => renderRedberryLogo());
    }, [mobileState]);

    //handling redirections
    useEffect(() => {
        const currUrl = window.location.pathname;
        const conditionalRedirection =
            currUrl.substring(currUrl.lastIndexOf('/' + 1)) === '/add-laptop';
        const savedProgress = JSON.parse(
            localStorage.getItem('add-laptop-state')
        );
        console.log(conditionalRedirection);
        if (conditionalRedirection) {
        } else if (savedProgress) {
            const {
                persistedMobileState,
                persistedMainDataObject,
                persistedCounter,
            } = savedProgress;

            setCounter(persistedCounter);
            setMainDataObject(persistedMainDataObject);
            setMobileState(persistedMobileState);
        }
    }, [navigate]);

    const prevRoute = () => navigate('/');
    return (
        <AddLaptopContainer>
            <VectorContainer onClick={prevRoute}>
                <Vector />
            </VectorContainer>
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
            <p>{counter}/2</p>
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
                <Route path='/laptop-specs' element={<LaptopInfo />} />
            </Routes>
            {mobileState && (
                <div>
                    <img
                        src={require('../../assets/addLaptop/LOGO-10 2.png')}
                        alt='logo'
                    />
                </div>
            )}
        </AddLaptopContainer>
    );
};
