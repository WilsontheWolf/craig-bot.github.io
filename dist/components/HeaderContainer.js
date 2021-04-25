import {cloneElement, useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import {HeaderButton} from "./HeaderButton.js";
import WindowSize from "./WindowSize.js";
import React from "../../_snowpack/pkg/react.js";
export const HeaderContainer = ({children, className, onClick, side}) => {
  const [width] = WindowSize();
  const [shouldCollapse, setCollapse] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (showMenu)
      return;
    const collapse = width - 160 - ref.current?.offsetWidth < 0;
    setCollapse(collapse);
  }, [ref.current?.offsetWidth, width, showMenu]);
  useEffect(() => {
    window.addEventListener("hashchange", () => setMenu(false));
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: `${side === "left" ? "left-0" : "right-0"} h-10 fixed top-0 ` + (className || "")
  }, /* @__PURE__ */ React.createElement("span", {
    className: showMenu ? "hidden" : shouldCollapse ? "invisible" : ""
  }, children.map((child) => cloneElement(child, {wide: false, disabled: shouldCollapse}))), /* @__PURE__ */ React.createElement("span", {
    className: `${shouldCollapse ? "" : "invisible"} absolute top-0 right-0 h-full`
  }, /* @__PURE__ */ React.createElement(HeaderButton, {
    onClick: () => setMenu(!showMenu)
  }, "🍔")), /* @__PURE__ */ React.createElement("div", {
    className: `w-screen h-screen left-0 bg-black transition-all duration-500 bg-opacity-75 mt-10 ${showMenu ? "" : "hidden"}`
  }, children.map((child) => cloneElement(child, {wide: true, disabled: !shouldCollapse, close: () => setMenu(false)}))));
};
