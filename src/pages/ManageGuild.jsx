import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import React from 'react';
import useLoginData from "../components/useLoginData";
import loader from '/images/loader.svg';
import Swal from "sweetalert2";
const urlRegex = /^guilds\/(\d+)/;

const ManageGuild = {
    Page: ({ url }) => {
        const { ready, loggedIn, user, error, logout, load, guilds } = useLoginData(state => state);
        const guildID = url.match(urlRegex)?.[1];
        if (!guildID) {
            window.location.replace('#/guilds')
            return null;
        }
        const guild = guilds.find(g => g.id === guildID);
        return (
            <div className="md:mx-10 mx-5">
                {error ? ['There was an error logging in:', <br />, error, <br />, <Button onClick={() => load()}>Retry</Button>, <Button onClick={async () => {
                    const result = await Swal.fire({
                        title: 'Logout!',
                        text: 'Are you sure you want to log out?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Logout!'
                    });
                    if (result.isConfirmed) {
                        logout();
                        window.location.href = '#/'
                    }
                }}>Logout</Button>] :
                    ready ?
                        loggedIn ?
                        !guild ? 'I\'m sorry I couldn\'t find that server.' :
                            <>
                                <h1 className="text-2xl">{guild.name}</h1>
                                <p>Guild settings are currently unavailable. Please check back later.</p>
                            </> :
                            [<p>To access this page please login.</p>, <Button link={`#/login/${window.location.hash}`}>Login!</Button>] :
                        <img className="m-auto h-16 mt-5" src={loader} />}
            </div >
        );
    },
    match: /^guilds\/.+/
}

export default ManageGuild;
