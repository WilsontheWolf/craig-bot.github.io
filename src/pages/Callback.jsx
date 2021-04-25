import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import React from 'react';
import useLoginData from "../components/useLoginData";
const urlRegex = /callback\/*#?(.*)/;

const Callback = {
    Page: ({ url }) => {
        const { load } = useLoginData(state => state);
        let match = url?.match(urlRegex);
        let code = match?.[1];
        if (code !== 'invite') {
            if (!window.localStorage)
                return "Unable to login due to missing feature LocalStorage!"
            if (code) {
                window.localStorage.setItem('token', code)
                load(code);
            }
        }
        if (window.sessionStorage) {
            location.replace(`#${window.sessionStorage.getItem('return') || '/'}`);
        }
        else
            location.replace(`#/`);
        return null;
    },
    match: '^callback.*'
}

export default Callback;
