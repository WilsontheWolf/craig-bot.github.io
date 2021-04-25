import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import useLoginData from "../components/useLoginData.js";
const urlRegex = /callback\/*#?(.*)/;
const InviteCallback = {
  Page: () => {
    if (window.sessionStorage)
      location.replace(`#${window.sessionStorage.getItem("return") || "/"}`);
    else
      location.replace(`#/`);
    return null;
  },
  match: "^callbackinvite$"
};
export default InviteCallback;
