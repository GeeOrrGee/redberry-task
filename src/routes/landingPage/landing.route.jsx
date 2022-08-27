import {
    ButtonsContainer,
    ImageContainer,
    LandingPageContainer,
    RouteButton,
} from './landing.styles';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Landing = () => {
    const [mobileImageState, setMobileImageState] = useState(false);

    const conditionalImageRender = () => {
        const currWidth = window.innerWidth;
        setMobileImageState(currWidth < 500);
    };
    useEffect(() => {
        conditionalImageRender();
        window.addEventListener('resize', () => conditionalImageRender());
        return window.removeEventListener('resize', () =>
            conditionalImageRender()
        );
    }, []);
    return (
        <LandingPageContainer>
            {/* <ImageContainer> */}
            <img
                src={require('../../assets/landingPage/LOGO-02 1.png')}
                alt='logo'
            />
            {!mobileImageState ? (
                <img
                    src={require('../../assets/landingPage/Group 1.png')}
                    alt='cover'
                />
            ) : (
                <img
                    src={require('../../assets/landingPage/Group.png')}
                    alt='cover'
                />
            )}

            {/* </ImageContainer> */}
            <ButtonsContainer>
                <RouteButton>
                    <Link to={'/add-laptop'}>ჩანაწერის დამატება</Link>
                </RouteButton>
                <RouteButton>
                    <Link to={'/laptops'}>ჩანაწერების სია</Link>
                </RouteButton>
            </ButtonsContainer>
        </LandingPageContainer>
    );
};
