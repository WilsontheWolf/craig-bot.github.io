import { useState, useEffect } from 'react';
import create from 'zustand';
import config from "../config.json";

let loaded = false;

const useLoginData = create((set, get) => ({
    ready: false,
    loggedIn: false,
    user: null,
    guilds: null,
    id: null,
    level: null,
    error: null,
    logout: (clear = true, ready = true) => {
        if (clear)
            window.localStorage.removeItem('token');
        return set(state => ({
            ready,
            loggedIn: false,
            user: null,
            guilds: null,
            id: null,
            level: null,
            levelName: null,
            error: null
        }));
    },
    load: async (token) => {
        get().logout(false, false);
        set({ ready: false })
        if (!window.localStorage) return set({
            ready: true,
            error: 'Missing required feature localStorage. If you believe you got this is mistake please reload and try again.'
        });
        if (!token) token = localStorage.getItem('token');
        if (!token) return set({
            ready: true
        });
        // TODO: Make a request here
        let data;
        try {
            const request = await fetch(`${config.baseURL}me`, {
                headers: { authorization: token }
            });
            // Our token is invalid
            if (request.status === 403 || request.status === 401)
                return get().logout();
            if (!request.ok) {
                try {
                    data = await request.json();
                } catch (e) { }
                return set({
                    ready: true,
                    error: `An error occurred getting login data. 
Error ${request.status}: ${data?.message || request.statusText}`
                });
            }
            data = await request.json();
        } catch (e) {
            return set({
                ready: true,
                error: `An error occurred getting login data. 
${e}`
            });
        }
        // const data = {
        //     user: {
        //         id: '517371142508380170',
        //         username: 'WilsontheWolf',
        //         tag: '0074',
        //         avatar: 'd4db226e0a41ddbb0506f592a5743851'
        //     },
        //     guilds: null,
        //     level: 10,
        //     levelName: 'Bot Owner'
        // };
        set({
            ...data,
            ready: true,
            loggedIn: true
        })
    }
}))

if (!loaded) {
    loaded = true;
    useLoginData.getState().load();
}

export default useLoginData;
