import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SuggestionsProvider } from './context/SuggestionsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SuggestionsProvider>
            <App />
        </SuggestionsProvider>
    </React.StrictMode>
);
