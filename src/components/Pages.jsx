import Docs from '../pages/Docs';
import Index from '../pages/Index'
import MDXPage from '../pages/MDXPage';
import Commands from '../pages/Commands';
import React from 'react';
import Login from '../pages/Login';
import User from '../pages/User';
import Callback from '../pages/Callback';
import Guilds from '../pages/Guilds';
import Invite from '../pages/Invite';
import ManageGuild from '../pages/ManageGuild';

// No way to auto import so I have to manually do it. 
const pages = [
    Index,
    Docs,
    Commands,
    Login,
    User,
    Guilds,
    Callback,
    Invite,
    ManageGuild
];

function Pages({ url }) {
    let Page;
    Page = pages.find(p => url.match(p.match));
    if (!Page) Page = MDXPage;
    return <Page.Page url={url} />;
}

export default Pages;
