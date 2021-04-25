import { cloneElement, useEffect, useRef, useState } from "react";
import { HeaderButton } from "./HeaderButton";
import WindowSize from "./WindowSize"
import React from 'react';

export const HeaderContainer = ({ children, className, onClick, side }) => {
    const [width] = WindowSize();
    const [shouldCollapse, setCollapse] = useState(false);
    const [showMenu, setMenu] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        // Don't mess with the hamburger if the menu is open
        if(showMenu) return;
        // assume the width of the title is 160 pixels (this gives us extra room) 
        const collapse = ((width - 160) - ref.current?.offsetWidth ?? 0) < 0;
        setCollapse(collapse);
    }, [ref.current?.offsetWidth, width, showMenu]);
    useEffect(() => {
        window.addEventListener('hashchange', () => setMenu(false));
    }, []);
    return <div ref={ref}
        className={`${side === 'left' ? 'left-0' : 'right-0'} h-10 fixed top-0 ` + (className || '')}
    >
        <span className={showMenu ? 'hidden' : shouldCollapse ? 'invisible' : ''}>{children.map(child => cloneElement(child, { wide: false, disabled: shouldCollapse }))}</span>
        <span className={`${shouldCollapse ? '' : 'invisible'} absolute top-0 right-0 h-full`}><HeaderButton onClick={() => setMenu(!showMenu)}>🍔</HeaderButton></span>
        <div className={`w-screen h-screen left-0 bg-black transition-all duration-500 bg-opacity-75 mt-10 ${showMenu ? '' : 'hidden'}`}>{children.map(child => cloneElement(child, { wide: true, disabled: !shouldCollapse, close: () => setMenu(false) }))}</div>
    </div>
}