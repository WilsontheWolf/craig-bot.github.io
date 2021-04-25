import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import config from "../config.json.proxy.js";
const Index = {
  Page: () => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "md:mx-10 mx-5"
    }, /* @__PURE__ */ React.createElement(Banner, {
      type: "warn"
    }, "This site is still in early development! Features might be missing or broken."), /* @__PURE__ */ React.createElement("h1", {
      className: "text-4xl"
    }, config.botName), /* @__PURE__ */ React.createElement("p", null, config.botName, " is a discord bot designed to be easy to use. He is still in development."), /* @__PURE__ */ React.createElement(Button, {
      link: `#/invite/#/`
    }, "Invite ", config.botName, "!"), " ", /* @__PURE__ */ React.createElement(Button, {
      link: "#/about"
    }, "About ", config.botName, "!"));
  },
  match: "^$"
};
export default Index;
