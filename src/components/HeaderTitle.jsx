import logo from '../icon.png';
import React from 'react';
import config from "../config.json";

export const HeaderTitle = ({ className }) => {
    return <button
        className={`bg-gray-900 rounded px-3 text-white font-medium text-lg h-full relative z-50` + (className || '')}
        onClick={() => window.location.href = '#/'}
    >
        <img src={logo} alt="logo" className="h-9 rounded-full inline-block" /> {config.botName}
            </button>
}