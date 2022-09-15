import { BlueButton } from '../../shared/blueButton/blue-button.styles';
import {
    Backdrop,
    LinksContainer,
    SuccessMessageContainer,
    SuccessModalContainer,
} from './success-modal.styles';
import { Link } from 'react-router-dom';

export const SuccessModal = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     localStorage.clear();
    //     // const reset = () => dispatch(setDefault());
    //     return () => {
    //         console.log('fired');
    //         dispatch(setDefault());
    //     };
    // }, [dispatch]);
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
                    <Link to='/laptops'>
                        <BlueButton>სიაში გადაყვანა</BlueButton>
                    </Link>
                    <Link to={'/'}>მთავარი</Link>
                </LinksContainer>
            </SuccessModalContainer>
            ;
        </>
    );
};
