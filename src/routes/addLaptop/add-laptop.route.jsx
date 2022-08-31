import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { CoworkerInfo } from './coworker-info/coworker-info.route';
import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import {
    AddLaptopContainer,
    NavlinksContainer,
    VectorContainer,
} from './add-laptop.styles';
import { useEffect, useState } from 'react';
//TODO extract data from childroutes, add conditional step increment based on the routes and add the last form page
export const AddLaptop = () => {
    const navigate = useNavigate();
    const [mobileState, setMobileState] = useState(true);
    // console.log(redberrmobiyState);

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

    useEffect(() => {
        const currUrl = window.location.pathname;
        const conditionalRedirection =
            currUrl.substring(currUrl.lastIndexOf('/' + 1)) === '/add-laptop';
        const savedProgress = JSON.parse(
            localStorage.getItem('add-laptop-route')
        );

        if (savedProgress) {
            navigate(savedProgress);
        } else if (conditionalRedirection) {
            navigate('/add-laptop/coworker-info');
        }
    }, [navigate]);

    const prevRoute = () => navigate(-2);
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
            <p>asdasd</p>
            <Routes>
                <Route path='/coworker-info' element={<CoworkerInfo />} />
                <Route path='/laptop-specs' element={<CoworkerInfo />} />
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
