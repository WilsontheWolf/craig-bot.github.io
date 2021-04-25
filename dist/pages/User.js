import {Button} from "../components/Button.js";
import {Banner} from "../components/Banner.js";
import React from "../../_snowpack/pkg/react.js";
import useLoginData from "../components/useLoginData.js";
import loader from "../../images/loader.svg.proxy.js";
import Swal from "../../_snowpack/pkg/sweetalert2.js";
const User = {
  Page: () => {
    const {ready, loggedIn, user, error, logout, load} = useLoginData((state) => state);
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
      /* @__PURE__ */ React.createElement("p", null, "What would you like to do?"),
      /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(Button, {
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
      }, "Logout"))
    ] : [/* @__PURE__ */ React.createElement("p", null, "To access this page please login."), /* @__PURE__ */ React.createElement(Button, {
      link: `#/login/${window.location.hash}`
    }, "Login!")] : /* @__PURE__ */ React.createElement("img", {
      className: "m-auto h-16 mt-5",
      src: loader
    }));
  },
  match: "^user$"
};
export default User;
