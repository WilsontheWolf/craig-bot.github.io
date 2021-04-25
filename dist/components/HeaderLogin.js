import {Menu, Transition} from "../../_snowpack/pkg/@headlessui/react.js";
import React, {Fragment, useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import useLoginData from "./useLoginData.js";
import loader from "../../images/loader.svg.proxy.js";
import Swal from "../../_snowpack/pkg/sweetalert2.js";
const getClass = ({active, type, wide}) => {
  let colours;
  if (type === "danger")
    colours = `${active ? "bg-red-500 text-white" : "text-red-500"}`;
  else
    colours = `${active ? "bg-blue-400" : ""} text-white`;
  return `${colours} ${wide ? "font-medium text-lg" : "rounded-md px-2 text-md"} group flex items-center w-full py-2 `;
};
export const HeaderLogin = ({children, className, link: path, onClick, cur, wide, width}) => {
  const {error, ready, loggedIn, user, load, logout} = useLoginData((state) => state);
  return !error && ready && loggedIn ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Menu, {
    as: "div",
    className: `inline-block ${wide ? "h-10 w-full" : "h-full ml-1"}`
  }, ({open}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Menu.Button, {
    className: `hover:bg-blue-400 align-top ${cur ? cur === "user" ? "bg-blue-500" : "bg-gray-900 focus:bg-blue-400" : "bg-gray-900 focus:bg-blue-400"} ${wide ? "h-10 w-full" : "h-full ml-1 rounded"} px-3 text-white font-medium text-lg focus:outline-none` + (className || "")
  }, /* @__PURE__ */ React.createElement("img", {
    src: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`,
    alt: "logo",
    className: "h-8 w-8 rounded-full inline-block"
  }), " ", user.username), /* @__PURE__ */ React.createElement(Transition, {
    show: open,
    as: Fragment,
    enter: "transition ease-out duration-100",
    enterFrom: "transform opacity-0 scale-95",
    enterTo: "transform opacity-100 scale-100",
    leave: "transition ease-in duration-75",
    leaveFrom: "transform opacity-100 scale-100",
    leaveTo: "transform opacity-0 scale-95"
  }, /* @__PURE__ */ React.createElement(Menu.Items, {
    static: true,
    className: `absolute right-0 ${wide ? "w-full" : "rounded-md"} origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white`
  }, [[
    {
      name: "Manage Servers",
      href: "#/guilds"
    },
    {
      name: "Manage User Settings",
      href: "#/user"
    }
  ], [
    {
      name: "Logout",
      type: "danger",
      onClick: async () => {
        const result = await Swal.fire({
          title: "Logout!",
          text: "Are you sure you want to log out?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Logout!"
        });
        if (result.isConfirmed) {
          logout();
          window.location.href = "#/";
        }
      }
    }
  ]].map((items) => /* @__PURE__ */ React.createElement("div", {
    className: `${wide ? "" : "px-1 py-1"}`
  }, items.map(({name, href, type, onClick: onClick2}) => /* @__PURE__ */ React.createElement(Menu.Item, null, ({active}) => onClick2 ? /* @__PURE__ */ React.createElement("button", {
    className: getClass({active, type, wide}),
    onClick: onClick2
  }, name) : /* @__PURE__ */ React.createElement("a", {
    className: getClass({active, type, wide}),
    href
  }, name)))))))))) : /* @__PURE__ */ React.createElement("button", {
    className: `hover:bg-blue-400 align-top ${cur ? cur === "user" ? "bg-blue-500" : "bg-gray-900 focus:bg-blue-400" : "bg-gray-900 focus:bg-blue-400"} ${wide ? "h-10 w-full" : "h-full ml-1 rounded"} px-3 text-white font-medium text-lg focus:outline-none` + (className || ""),
    onClick: () => {
      if (error)
        Swal.fire({
          title: "Error Logging In!",
          html: error.replace("\n", "<br/>"),
          icon: "error",
          cancelButtonText: "Dismiss",
          confirmButtonText: "Retry",
          denyButtonText: "Logout",
          showCancelButton: true,
          showDenyButton: true
        }).then((result) => {
          if (result.isConfirmed)
            load();
          else if (result.isDenied)
            logout();
        });
      else if (ready && !loggedIn)
        window.location.href = "#/login";
    }
  }, error ? "Error" : ready ? "Login" : [/* @__PURE__ */ React.createElement("img", {
    className: "h-8 inline",
    src: loader
  }), wide ? "Loading..." : null]);
};
