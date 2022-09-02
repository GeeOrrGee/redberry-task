import { BlueButton } from '../../shared/blueButton/blue-button.styles';
import {
    Backdrop,
    LinksContainer,
    SuccessMessageContainer,
    SuccessModalContainer,
} from './success-modal.styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const SuccessModal = () => {
    const localStorageClear = () => {
        localStorage.clear();

        return;
    };
    return (
        <>
            <Backdrop />{' '}
            <SuccessModalContainer>
                <SuccessMessageContainer>
                    <img
                        src={require('../../assets/success/Frame.png')}
                        alt='success_img'
                    />
                    <h2>ჩანაწერი დამატებულია!</h2>
                </SuccessMessageContainer>
                <LinksContainer>
                    <Link onClick={localStorageClear} to='/laptops'>
                        <BlueButton>სიაში გადაყვანა</BlueButton>
                    </Link>
                    <Link onClick={localStorageClear} to={'/'}>
                        მთავარი
                    </Link>
                </LinksContainer>
            </SuccessModalContainer>
            ;
        </>
    );
};
