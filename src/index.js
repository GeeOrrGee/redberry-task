import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.styles.js';
import App from './App';
import GlobalStyle from './index.styles.js';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyle />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
