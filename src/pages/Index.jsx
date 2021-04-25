import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import React from 'react';
import config from "../config.json";

// This really doesn't need to be its own page but this helps 
// keeps it fast and makes a good boilerplate for new pages
const Index = {
    Page: () => {
        return (
            <div className="md:mx-10 mx-5">
                <Banner type="warn">This site is still in early development! Features might be missing or broken.</Banner>
                <h1 className="text-4xl">{config.botName}</h1>
                <p>{config.botName} is a discord bot designed to be easy to use. He is still in development.</p>
                <Button link={`#/invite/#/`}>Invite {config.botName}!</Button> <Button link="#/about">About {config.botName}!</Button>
            </div>
        );
    },
    match: '^$'
}

export default Index;
