import { Button } from "../components/Button";
import loader from '/images/loader.svg';
import React, { Fragment, useEffect, useState } from 'react';
import MDXInline from "../components/MDXInline";
import config from "../config.json";
import { Transition } from "@headlessui/react";

const Commands = {
    Page: () => {
        const [commands, updateCommands] = useState(null);
        const [focused, changeFocused] = useState(null);
        const level = 3;
        const load = async () => {
            updateCommands(null);
            try {
                const data = await fetch(`${config.baseURL}commands`);
                if (!data.ok) return updateCommands(`Error ${data.status} fetching command data!`);
                updateCommands(await data.json());
            } catch (e) {
                console.error(e);
                updateCommands(`${e.name} fetching command data!`);
            }
        }
        useEffect(() => {
            load();
        }, [])
        return (
            <div className="md:mx-10 mx-5">
                <h1 className="text-4xl mb-4">Commands</h1>
                <div className={typeof commands === 'string' ? '' : 'cmd-grid'}>{
                    commands ?
                        typeof commands === 'string' ? [commands, <br/>, <Button onClick={() => load()}>Retry</Button>] : commands
                            .filter(c => c.level <= level)
                            .map((command) => {
                                return <div className="w-64 rounded border border-black align-top h-full bg-gray-800">
                                    <h1 className="w-full bg-gray-900 rounded-t px-5 py-2 text-2xl mb-1">
                                        {command.name}
                                    </h1>
                                    <div className="w-full rounded-b px-5 py-2 ">
                                        {[
                                            <p className="pb-2">{command.description}</p>,
                                            <Button colours={{
                                                from: 'gray-500',
                                                to: 'gray-700',
                                                focusFrom: 'gray-700',
                                                focusTo: 'gray-500'
                                            }}
                                                onClick={() => changeFocused(command)}>More info</Button>]}
                                    </div>
                                </div>
                            })
                        : <img className="m-auto" src={loader} />
                }</div>
                <div className={`w-screen h-screen left-0 bg-black duration-500 bg-opacity-75 fixed top-0 box-border ${focused ? '' : 'hidden'}`}>
                    <Transition
                        show={!!focused}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="h-full box-border pt-12 pb-2 w-full md:px-52 px-5" >
                            <div className="bg-gray-800 h-full box-border rounded-lg overflow-y-auto relative">
                                <Button className="absolute top-1 right-1 px-5 py-1"
                                    disabledPadding={true}
                                    onClick={() => changeFocused(null)}
                                    colours={{
                                        from: 'gray-500',
                                        to: 'gray-700',
                                        focusFrom: 'gray-700',
                                        focusTo: 'gray-500'
                                    }}
                                >X</Button>
                                <h1 className="w-full bg-gray-900 rounded-t px-5 py-1.5 text-2xl mb-4">
                                    {focused?.name}
                                </h1>
                                <p className="px-5 font-bold" >
                                    Usage:
                                </p>
                                <p className="px-5 mb-4" >
                                    {focused?.name} {focused?.usage}
                                </p>
                                <p className="px-5 font-bold" >
                                    Description:
                                </p>
                                <p className="px-5" >
                                    {focused?.description}
                                </p>
                                {focused?.moreHelp ?
                                    <MDXInline allowHTML={false} overrides={{
                                        p: {
                                            props: {
                                                className: "px-5"
                                            }
                                        }
                                    }}>{
                                            focused?.moreHelp.replace(/\n/g, '\n\n')
                                        }</MDXInline>
                                    : null
                                }
                                <div className="grid grid-cols-3 mt-4" >
                                    <div>
                                        <p className="px-5 font-bold" >
                                            Category:
                                        </p>
                                        <p className="px-5" >
                                            {focused?.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="px-5 font-bold" >
                                            Aliases:
                                        </p>
                                        <p className="px-5" >
                                            {focused?.aliases[0] ? focused?.aliases.join(', ') : 'none'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="px-5 font-bold" >
                                            Server Only:
                                        </p>
                                        <p className="px-5" >
                                            {focused?.guildOnly.toString()}
                                        </p>
                                    </div>
                                </div>
                            </div></div>
                    </Transition></div>
            </div>
        );
    },
    match: '^commands(?:\/.*)?$'
}

export default Commands;
