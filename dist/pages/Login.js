import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import useLoginData from "../components/useLoginData.js";
import config from "../config.json.proxy.js";
const urlRegex = /login\/*#?(.*)/;
const Login = {
  Page: ({url}) => {
    const {loggedIn} = useLoginData((state) => state);
    if (loggedIn)
      window.location.replace("#/user");
    else {
      if (window.sessionStorage) {
        let match = url?.match(urlRegex);
        if (match?.[1])
          window.sessionStorage.setItem("return", match?.[1]);
      }
      window.location.replace(`${config.baseURL}login`);
    }
    return null;
  },
  match: "^login.*"
};
export default Login;
