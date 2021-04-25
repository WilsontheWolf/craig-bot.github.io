import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import React from 'react';
import useLoginData from "../components/useLoginData";
const urlRegex = /callback\/*#?(.*)/;

const InviteCallback = {
    Page: () => {
        if (window.sessionStorage)
            location.replace(`#${window.sessionStorage.getItem('return') || '/'}`);
        else
            location.replace(`#/`);
        return null;
    },
    match: '^callbackinvite$'
}

export default InviteCallback;
