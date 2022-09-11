import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.styles.js';
import App from './App';
import GlobalStyle from './index.styles.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GlobalStyle />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
