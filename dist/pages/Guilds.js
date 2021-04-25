import {Button} from "../components/Button.js";
import loader from "../../images/loader.svg.proxy.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import useLoginData from "../components/useLoginData.js";
import config from "../config.json.proxy.js";
const Guilds = {
  Page: () => {
    const {ready, loggedIn, user, error, logout, load, guilds} = useLoginData((state) => state);
    console.log(guilds);
    return /* @__PURE__ */ React.createElement("div", {
      className: "md:mx-10 mx-5"
    }, error ? ["There was an error logging in:", /* @__PURE__ */ React.createElement("br", null), error, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Button, {
      onClick: () => load()
    }, "Retry"), /* @__PURE__ */ React.createElement(Button, {
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
    }, "Logout")] : ready ? loggedIn ? [
      /* @__PURE__ */ React.createElement("h1", {
        className: "text-2xl"
      }, "Welcome ", user.username),
      /* @__PURE__ */ React.createElement("p", null, "Here are your servers"),
      /* @__PURE__ */ React.createElement("div", {
        className: "cmd-grid"
      }, guilds.filter((g) => g.owner || (g.permissions_new & 32) == 32 || (g.permissions_new & 8) == 8).sort((gA, gB) => {
        const nameA = gA.name.toUpperCase();
        const nameB = gB.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }).sort((gA, gB) => gA.botJoined === gB.botJoined ? 0 : gA.botJoined ? -1 : 1).map((guild) => {
        return /* @__PURE__ */ React.createElement("div", {
          className: "w-64 rounded border border-black align-top h-full bg-gray-800 p-1 guild-grid"
        }, /* @__PURE__ */ React.createElement("div", {
          className: "guild-image"
        }, guild.icon ? /* @__PURE__ */ React.createElement("img", {
          src: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
          alt: "logo",
          className: "w-full rounded-full inline-block my-auto"
        }) : /* @__PURE__ */ React.createElement("span", {
          className: "w-full my-auto text-center overflow-clip"
        }, guild.name.replace(/'s /g, " ").replace(/\w+/g, (e) => e[0]).replace(/\s/g, "").slice(0, 4))), /* @__PURE__ */ React.createElement("div", {
          className: "guild-name truncate"
        }, guild.name), /* @__PURE__ */ React.createElement("div", {
          className: "guild-actions"
        }, /* @__PURE__ */ React.createElement(Button, {
          colours: {
            from: "gray-500",
            to: "gray-700",
            focusFrom: "gray-700",
            focusTo: "gray-500"
          },
          onClick: () => guild.botJoined ? window.location.href = `#/guilds/${guild.id}` : window.location.href = `#/invite/${guild.id}#/guilds`
        }, guild.botJoined ? "Manage" : "Invite")));
      }))
    ] : [/* @__PURE__ */ React.createElement("p", null, "To access this page please login."), /* @__PURE__ */ React.createElement(Button, {
      link: `#/login/${window.location.hash}`
    }, "Login!")] : /* @__PURE__ */ React.createElement("img", {
      className: "m-auto h-16 mt-5",
      src: loader
    }));
  },
  match: "^guilds$"
};
export default Guilds;
