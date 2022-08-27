import './App.styles.js';
import { Routes, Route } from 'react-router-dom';
import { Landing } from './routes/landingPage/landing.route';
import { MainContainer } from './App.styles.js';

function App() {
    return (
        <MainContainer>
            .{' '}
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/add-laptop' />
                <Route path='/laptops' />
            </Routes>
        </MainContainer>
    );
}

export default App;
