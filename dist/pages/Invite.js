import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import config from "../config.json.proxy.js";
const urlRegex = /invite\/*(\d*)#?(.*)/;
const Invite = {
  Page: ({url}) => {
    let match = url?.match(urlRegex);
    if (window.sessionStorage) {
      if (match?.[2])
        window.sessionStorage.setItem("return", match?.[2]);
    }
    window.location.replace(`${config.baseURL}invite${match?.[1] ? `?guild=${match?.[1]}` : ""}`);
    return null;
  },
  match: "^invite.*"
};
export default Invite;
