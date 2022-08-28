import './App.styles.js';
import { Routes, Route } from 'react-router-dom';
import { Landing } from './routes/landingPage/landing.route';
import { MainContainer } from './App.styles.js';
import { AddLaptop } from './routes/addLaptop/add-laptop.route.jsx';
import axios from 'axios';

//TODO: 1- add form layout (filter positions based on the teams); 2-add form validations; 3(optional)- send POST request and persist and clear all the data

function App() {
    const conditionalBackground =
        window.location.pathname.includes('add-laptop');
    console.log(conditionalBackground);
    return (
        <MainContainer grey={conditionalBackground}>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/add-laptop/*' element={<AddLaptop />} />
                <Route
                    path='/laptops/'
                    element={<input type='file' accept='image/*' />}
                />
            </Routes>
        </MainContainer>
    );
}

export default App;
