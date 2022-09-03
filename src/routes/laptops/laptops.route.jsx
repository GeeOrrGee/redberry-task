import { useNavigate, Routes, Route } from 'react-router-dom';
import { VectorContainer } from '../addLaptop/add-laptop.styles';
import { ReactComponent as VectorSvg } from '../../assets/addLaptop/Vector.svg';
import LaptopsList from './laptopsList/laptops-list.route';
import { LaptopPageContainer } from './laptopsPage.styles';
import LaptopDetails from './laptopsDetails/laptop-details.route';

export const Laptops = () => {
    const navigate = useNavigate();
    const prevRouteHandler = () => navigate(-1);

    return (
        <LaptopPageContainer>
            {' '}
            <VectorContainer onClick={prevRouteHandler}>
                <VectorSvg />
            </VectorContainer>
            <Routes>
                <Route index element={<LaptopsList />} />
                <Route path='/:id' element={<LaptopDetails />} />
            </Routes>
        </LaptopPageContainer>
    );
};

export default Laptops;
