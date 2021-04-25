import { Button } from "../components/Button";
import { Banner } from "../components/Banner";
import MD from 'markdown-to-jsx';
import React, { useEffect, useState } from "react";
import loader from '/images/loader.svg';
import config from "../config.json"
import {
    DiscordMention,
    DiscordMessage,
    DiscordMessages
} from '@skyra/discord-components-react';

const update = async (url, path = '/pages/') => {
    let value
    try {
        console.log(import.meta.url)
        let data = await fetch(`${import.meta.env.SNOWPACK_PUBLIC_URL}${path}${url}.mdx`);
        if (!data.ok) value = `Error loading page! ${data.status} ${data.statusText}`
        else value = await data.text();
        if (value.startsWith('<!DOCTYPE html>') && import.meta.env.NODE_ENV === 'development') value = 'Error loading page! 404 Not found!';
    }
    catch (e) {
        if (navigator.onLine)
            value = `Error loading page! ${e}`
        else
            value = 'This page does not appear to be cached! Please connect to the internet and try again.'
    }
    return value;
}

const MDXPage = {
    Page: ({ url, className, path, ...props }) => {
        const [data, setData] = useState(null);
        const values = { botName: config.botName, botId: config.botId, botTag: config.botTag };
        useEffect(() => {
            (async () => {
                setData(null)
                if (url)
                    setData(await update(url, path))
            })();
        }, [url])
        return (
            <div className={className || "md:mx-10 mx-5"} {...props}>
                {data === null ? <img className="m-auto h-16 mt-5" src={loader} /> :
                    <MD
                        options={{
                            overrides: {
                                a: {
                                    props: {
                                        className: "text-blue-500 hover:text-blue-400 focus:text-blue-400 focus:outline-none"
                                    }
                                },
                                h1: {
                                    props: {
                                        className: "text-4xl"
                                    }
                                },
                                h2: {
                                    props: {
                                        className: "text-3xl"
                                    }
                                },
                                Banner,
                                Button,
                                DiscordMessages,
                                DiscordMessage,
                                DiscordMention,
                                code: {
                                    props: {
                                        className: "bg-gray-900 rounded-md pt-1 px-1"
                                    }
                                }
                            },
                            createElement(type, props, children) {
                                if (type === 'img') props.src = import.meta.env.SNOWPACK_PUBLIC_URL + '/images/' + props.src;
                                if (props.forceClass) props.className = props.forceClass;
                                return React.createElement(type, props, children);
                            },
                        }
                        }
                        scope={{
                            main: import.meta.env.SNOWPACK_PUBLIC_URL + "#"
                        }}
                    >{data.replace(/{{\s*(\w+)\s*}}/g, (orig, value) =>
                        values[value] ?? orig
                    )}</MD>}
            </div >
        )
    },
    match: '^$',

}

export default MDXPage;
