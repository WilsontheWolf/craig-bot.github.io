import { HeaderButton } from "./HeaderButton"
import { HeaderContainer } from "./HeaderContainer"
import { HeaderTitle } from "./HeaderTitle"
import { HeaderLogin } from "./HeaderLogin"
import React, { useEffect, useState } from 'react';
import getPage from './getPage';
import { HeaderDivider } from "./HeaderDivider";
import config from "../config.json";

function Header(props) {
    const [page, setPage] = useState(getPage());
    useEffect(() => {
        window.addEventListener('hashchange', () => setPage(getPage));
    }, []);

    return (
        <div>
            <header className="top-0 fixed h-10 bg-gray-900 w-full z-50">
                <HeaderTitle />
                <HeaderContainer side="right">
                    <HeaderButton link="about" cur={page}>About {config.botName}</HeaderButton>
                    <HeaderButton link="commands" cur={page}>Commands</HeaderButton>
                    <HeaderDivider />
                    <HeaderLogin cur={page}/>
                </HeaderContainer>
            </header>
            <div className="h-11" />
        </div>
    )
}

export default Header