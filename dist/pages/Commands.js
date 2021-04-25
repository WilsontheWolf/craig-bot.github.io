import {Button} from "../components/Button.js";
import loader from "../../images/loader.svg.proxy.js";
import React, {Fragment, useEffect, useState} from "../../_snowpack/pkg/react.js";
import MDXInline from "../components/MDXInline.js";
import config from "../config.json.proxy.js";
import {Transition} from "../../_snowpack/pkg/@headlessui/react.js";
const Commands = {
  Page: () => {
    const [commands, updateCommands] = useState(null);
    const [focused, changeFocused] = useState(null);
    const level = 3;
    const load = async () => {
      updateCommands(null);
      try {
        const data = await fetch(`${config.baseURL}commands`);
        if (!data.ok)
          return updateCommands(`Error ${data.status} fetching command data!`);
        updateCommands(await data.json());
      } catch (e) {
        console.error(e);
        updateCommands(`${e.name} fetching command data!`);
      }
    };
    useEffect(() => {
      load();
    }, []);
    return /* @__PURE__ */ React.createElement("div", {
      className: "md:mx-10 mx-5"
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "text-4xl mb-4"
    }, "Commands"), /* @__PURE__ */ React.createElement("div", {
      className: typeof commands === "string" ? "" : "cmd-grid"
    }, commands ? typeof commands === "string" ? [commands, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Button, {
      onClick: () => load()
    }, "Retry")] : commands.filter((c) => c.level <= level).map((command) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: "w-64 rounded border border-black align-top h-full bg-gray-800"
      }, /* @__PURE__ */ React.createElement("h1", {
        className: "w-full bg-gray-900 rounded-t px-5 py-2 text-2xl mb-1"
      }, command.name), /* @__PURE__ */ React.createElement("div", {
        className: "w-full rounded-b px-5 py-2 "
      }, [
        /* @__PURE__ */ React.createElement("p", {
          className: "pb-2"
        }, command.description),
        /* @__PURE__ */ React.createElement(Button, {
          colours: {
            from: "gray-500",
            to: "gray-700",
            focusFrom: "gray-700",
            focusTo: "gray-500"
          },
          onClick: () => changeFocused(command)
        }, "More info")
      ]));
    }) : /* @__PURE__ */ React.createElement("img", {
      className: "m-auto",
      src: loader
    })), /* @__PURE__ */ React.createElement("div", {
      className: `w-screen h-screen left-0 bg-black duration-500 bg-opacity-75 fixed top-0 box-border ${focused ? "" : "hidden"}`
    }, /* @__PURE__ */ React.createElement(Transition, {
      show: !!focused,
      as: Fragment,
      enter: "transition ease-out duration-100",
      enterFrom: "transform opacity-0 scale-95",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-95"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "h-full box-border pt-12 pb-2 w-full md:px-52 px-5"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "bg-gray-800 h-full box-border rounded-lg overflow-y-auto relative"
    }, /* @__PURE__ */ React.createElement(Button, {
      className: "absolute top-1 right-1 px-5 py-1",
      disabledPadding: true,
      onClick: () => changeFocused(null),
      colours: {
        from: "gray-500",
        to: "gray-700",
        focusFrom: "gray-700",
        focusTo: "gray-500"
      }
    }, "X"), /* @__PURE__ */ React.createElement("h1", {
      className: "w-full bg-gray-900 rounded-t px-5 py-1.5 text-2xl mb-4"
    }, focused?.name), /* @__PURE__ */ React.createElement("p", {
      className: "px-5 font-bold"
    }, "Usage:"), /* @__PURE__ */ React.createElement("p", {
      className: "px-5 mb-4"
    }, focused?.name, " ", focused?.usage), /* @__PURE__ */ React.createElement("p", {
      className: "px-5 font-bold"
    }, "Description:"), /* @__PURE__ */ React.createElement("p", {
      className: "px-5"
    }, focused?.description), focused?.moreHelp ? /* @__PURE__ */ React.createElement(MDXInline, {
      allowHTML: false,
      overrides: {
        p: {
          props: {
            className: "px-5"
          }
        }
      }
    }, focused?.moreHelp.replace(/\n/g, "\n\n")) : null, /* @__PURE__ */ React.createElement("div", {
      className: "grid grid-cols-3 mt-4"
    }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
      className: "px-5 font-bold"
    }, "Category:"), /* @__PURE__ */ React.createElement("p", {
      className: "px-5"
    }, focused?.category)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
      className: "px-5 font-bold"
    }, "Aliases:"), /* @__PURE__ */ React.createElement("p", {
      className: "px-5"
    }, focused?.aliases[0] ? focused?.aliases.join(", ") : "none")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
      className: "px-5 font-bold"
    }, "Server Only:"), /* @__PURE__ */ React.createElement("p", {
      className: "px-5"
    }, focused?.guildOnly.toString()))))))));
  },
  match: "^commands(?:/.*)?$"
};
export default Commands;
