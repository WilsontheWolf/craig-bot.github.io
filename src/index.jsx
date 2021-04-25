import React from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/dist/tailwind.css';
import '@sweetalert2/theme-dark';
import App from './App';
import Header from './components/Header';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);