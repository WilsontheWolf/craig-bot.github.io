import React from "../../_snowpack/pkg/react.js";
export const HeaderButton = ({children, className, link: path, onClick, cur, wide, close, disabled}) => {
  return /* @__PURE__ */ React.createElement("button", {
    className: `hover:bg-blue-400 align-top ${cur && path ? cur === path ? "bg-blue-500" : "bg-gray-900 focus:bg-blue-400" : "bg-gray-900 focus:bg-blue-400"} ${wide ? "h-10 w-full" : "h-full ml-1 rounded"} px-3 text-white font-medium text-lg focus:outline-none` + (className || ""),
    disabled,
    onClick: path ? cur === path && close ? close : () => window.location.href = `#${path}` : onClick || null
  }, " ", children);
};
