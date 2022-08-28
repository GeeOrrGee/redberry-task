import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { CoworkerInfo } from './coworker-info/coworker-info.route';
import { AddLaptopContainer, NavlinksContainer } from './add-laptop.styles';
import { useEffect } from 'react';
const activeNavlinkStyles = {
    // borderBottom: '3px solid #232323',
    '&::before': {
        display: 'block',
    },
};

export const AddLaptop = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const savedProgress = JSON.parse(
            localStorage.getItem('add-laptop-route')
        );

        console.log('LOOP');
        if (savedProgress) {
            navigate(savedProgress);
        } else {
            navigate('/add-laptop/coworker-info');
        }
    }, []);
    return (
        <AddLaptopContainer>
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
            <Routes>
                <Route path='/coworker-info' element={<CoworkerInfo />} />
                <Route path='/laptop-specs' element={<CoworkerInfo />} />
            </Routes>
        </AddLaptopContainer>
    );
};
