import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import useLoginData from "../components/useLoginData.js";
import loader from "../../images/loader.svg.proxy.js";
import Swal from "../../_snowpack/pkg/sweetalert2.js";
const urlRegex = /^guilds\/(\d+)/;
const ManageGuild = {
  Page: ({url}) => {
    const {ready, loggedIn, user, error, logout, load, guilds} = useLoginData((state) => state);
    const guildID = url.match(urlRegex)?.[1];
    if (!guildID) {
      window.location.replace("#/guilds");
      return null;
    }
    const guild = guilds.find((g) => g.id === guildID);
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
    }, "Logout")] : ready ? loggedIn ? !guild ? "I'm sorry I couldn't find that server." : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
      className: "text-2xl"
    }, guild.name), /* @__PURE__ */ React.createElement("p", null, "Guild settings are currently unavailable. Please check back later.")) : [/* @__PURE__ */ React.createElement("p", null, "To access this page please login."), /* @__PURE__ */ React.createElement(Button, {
      link: `#/login/${window.location.hash}`
    }, "Login!")] : /* @__PURE__ */ React.createElement("img", {
      className: "m-auto h-16 mt-5",
      src: loader
    }));
  },
  match: /^guilds\/.+/
};
export default ManageGuild;
