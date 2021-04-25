import React from "../../_snowpack/pkg/react.js";
import useLoginData from "./useLoginData.js";
import loader from "../../images/loader.svg.proxy.js";
import Swal from "../../_snowpack/pkg/sweetalert2.js";
export const HeaderLogin = ({children, className, link: path, onClick, cur, wide, width}) => {
  const {error, ready, loggedIn, user, load, logout} = useLoginData((state) => state);
  return /* @__PURE__ */ React.createElement("button", {
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
      else if (ready && loggedIn)
        window.location.href = "#/user";
      else if (ready && !loggedIn)
        window.location.href = "#/login";
    }
  }, error ? "Error" : ready ? loggedIn ? [/* @__PURE__ */ React.createElement("img", {
    src: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`,
    alt: "logo",
    className: "h-8 w-8 rounded-full inline-block"
  }), " ", user.username] : "Login" : [/* @__PURE__ */ React.createElement("img", {
    className: "h-8 inline",
    src: loader
  }), wide ? "Loading..." : null]);
};
