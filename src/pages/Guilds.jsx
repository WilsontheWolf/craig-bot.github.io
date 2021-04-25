import { Button } from "../components/Button";
import loader from '/images/loader.svg';
import React, { useEffect, useState } from 'react';
import useLoginData from "../components/useLoginData";
import config from "../config.json";

const Guilds = {
    Page: () => {
        const { ready, loggedIn, user, error, logout, load, guilds } = useLoginData(state => state);
        console.log(guilds)
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
                            [
                                <h1 className="text-2xl">Welcome {user.username}</h1>,
                                <p>Here are your servers</p>,
                                <div className="cmd-grid">{guilds
                                    .filter(g => g.owner || (g.permissions_new & 32) == 32 || (g.permissions_new & 8) == 8)
                                    .sort((gA, gB) => {
                                        const nameA = gA.name.toUpperCase();
                                        const nameB = gB.name.toUpperCase();
                                        if (nameA < nameB) {
                                            return -1;
                                        }
                                        if (nameA > nameB) {
                                            return 1;
                                        }
                                    })
                                    .sort((gA, gB) => (gA.botJoined === gB.botJoined ? 0 : gA.botJoined ? -1 : 1))
                                    .map((guild) => {
                                        return <div className="w-64 rounded border border-black align-top h-full bg-gray-800 p-1 guild-grid">
                                            <div className="guild-image">{
                                                guild.icon ?
                                                    <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} alt="logo" className="w-full rounded-full inline-block my-auto" />
                                                    : <span className="w-full my-auto text-center overflow-clip">{
                                                        // Generate the acronym
                                                        guild.name
                                                            .replace(/'s /g, ' ')
                                                            .replace(/\w+/g, e => e[0])
                                                            .replace(/\s/g, '')
                                                            // This is kinda a hack but after 4 it gets messy
                                                            .slice(0,4)
                                                    }</span>}
                                            </div>
                                            <div className="guild-name truncate">
                                                {guild.name}
                                            </div>
                                            <div className="guild-actions">
                                                <Button colours={{
                                                    from: 'gray-500',
                                                    to: 'gray-700',
                                                    focusFrom: 'gray-700',
                                                    focusTo: 'gray-500'
                                                }}
                                                    onClick={() => guild.botJoined ?
                                                        window.location.href = `#/guilds/${guild.id}` :
                                                        window.location.href = `#/invite/${guild.id}#/guilds` //`https://discord.com/oauth2/authorize?client_id=${config.botId}&scope=bot%20applications.commands&permissions=137751622&guild_id=${guild.id}`
                                                    }>{guild.botJoined ? 'Manage' : 'Invite'}</Button>
                                            </div>
                                        </div>
                                    })
                                }</div>
                            ] :
                            [<p>To access this page please login.</p>, <Button link={`#/login/${window.location.hash}`}>Login!</Button>] :
                        <img className="m-auto h-16 mt-5" src={loader} />}
            </div >
        );
    },
    match: '^guilds$'
}

export default Guilds;
