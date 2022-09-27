import { BlueButton } from '../../shared/blueButton/blue-button.styles';
import {
    Backdrop,
    LinksContainer,
    SuccessMessageContainer,
    SuccessModalContainer,
} from './success-modal.styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    removeSuccessModal,
    setDefault,
} from '../../store/Form/form-global/globalForm-actions';

export const SuccessModal = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => dispatch(setDefault()))();
        localStorage.clear();
    }, [dispatch]);

    const clearLocalStorage = async () => {
        localStorage.clear();
        dispatch(removeSuccessModal());
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
                    <Link to='/laptops' onClick={clearLocalStorage}>
                        <BlueButton>სიაში გადაყვანა</BlueButton>
                    </Link>
                    <Link to={'/'} onClick={clearLocalStorage}>
                        მთავარი
                    </Link>
                </LinksContainer>
            </SuccessModalContainer>
            ;
        </>
    );
};
