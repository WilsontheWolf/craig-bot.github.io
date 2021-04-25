import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import MD from "../../_snowpack/pkg/markdown-to-jsx.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import loader from "../../images/loader.svg.proxy.js";
import config from "../config.json.proxy.js";
import {
  DiscordMention,
  DiscordMessage,
  DiscordMessages
} from "../../_snowpack/pkg/@skyra/discord-components-react.js";
const update = async (url, path = "/pages/") => {
  let value;
  try {
    console.log(import.meta.url);
    let data = await fetch(`${__SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL}${path}${url}.mdx`);
    if (!data.ok)
      value = `Error loading page! ${data.status} ${data.statusText}`;
    else
      value = await data.text();
    if (value.startsWith("<!DOCTYPE html>") && __SNOWPACK_ENV__.NODE_ENV === "development")
      value = "Error loading page! 404 Not found!";
  } catch (e) {
    if (navigator.onLine)
      value = `Error loading page! ${e}`;
    else
      value = "This page does not appear to be cached! Please connect to the internet and try again.";
  }
  return value;
};
const MDXPage = {
  Page: ({url, className, path, ...props}) => {
    const [data, setData] = useState(null);
    const values = {botName: config.botName, botId: config.botId, botTag: config.botTag};
    useEffect(() => {
      (async () => {
        setData(null);
        if (url)
          setData(await update(url, path));
      })();
    }, [url]);
    return /* @__PURE__ */ React.createElement("div", {
      className: className || "md:mx-10 mx-5",
      ...props
    }, data === null ? /* @__PURE__ */ React.createElement("img", {
      className: "m-auto h-16 mt-5",
      src: loader
    }) : /* @__PURE__ */ React.createElement(MD, {
      options: {
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
        createElement(type, props2, children) {
          if (type === "img")
            props2.src = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL + "/images/" + props2.src;
          if (props2.forceClass)
            props2.className = props2.forceClass;
          return React.createElement(type, props2, children);
        }
      },
      scope: {
        main: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL + "#"
      }
    }, data.replace(/{{\s*(\w+)\s*}}/g, (orig, value) => values[value] ?? orig)));
  },
  match: "^$"
};
export default MDXPage;
