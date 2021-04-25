import React from "../../_snowpack/pkg/react.js";
export const HeaderDivider = ({children, className, link: path, onClick, cur, wide}) => {
  return /* @__PURE__ */ React.createElement("button", {
    className: `bg-gray-900 align-top pointer-events-none overflow-clip flex-nowrap ${wide ? "h-6 w-full" : "h-full ml-1 px-3"}  text-white font-medium text-lg focus:outline-none` + (className || ""),
    disabled: true
  }, wide ? /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-0.5 bg-gray-200"
  }) : "│");
};
