import logo from "../icon.png.proxy.js";
import React from "../../_snowpack/pkg/react.js";
import config from "../config.json.proxy.js";
export const HeaderTitle = ({className}) => {
  return /* @__PURE__ */ React.createElement("button", {
    className: `bg-gray-900 rounded px-3 text-white font-medium text-lg h-full relative z-50` + (className || ""),
    onClick: () => window.location.href = "#/"
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo,
    alt: "logo",
    className: "h-9 rounded-full inline-block"
  }), " ", config.botName);
};
