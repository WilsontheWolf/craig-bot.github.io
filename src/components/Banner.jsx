import React from 'react';

let types = {
    warn: 'from-yellow-400 to-yellow-600',
    error: 'from-red-500 to-yellow-800',
    success: 'from-green-400 to-green-600',
    info: 'from-blue-500 to-blue-700',
    none: ' '
}
export const Banner = ({ children, className, type }) => {
    return <p
        className={`my-2 bg-gradient-to-br rounded p-1 text-white font-medium text-lg text-center ${types[type] || types.info} ` + (className || '')}
    >{children}</p>
}