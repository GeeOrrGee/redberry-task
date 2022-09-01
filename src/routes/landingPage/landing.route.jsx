import {
    ButtonsContainer,
    ImageContainer,
    LandingPageContainer,
} from './landing.styles';
import { BlueButton } from '../../shared/blueButton/blue-button.styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Landing = () => {
    const [mobileImageState, setMobileImageState] = useState(false);
    console.log('LOOP?');
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
                <Link to={'/add-laptop/coworker-info'}>
                    <BlueButton>ჩანაწერის დამატება</BlueButton>
                </Link>

                <Link to={'/laptops'}>
                    <BlueButton>ჩანაწერების სია</BlueButton>
                </Link>
            </ButtonsContainer>
        </LandingPageContainer>
    );
};
