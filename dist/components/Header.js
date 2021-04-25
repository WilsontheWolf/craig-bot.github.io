import {HeaderButton} from "./HeaderButton.js";
import {HeaderContainer} from "./HeaderContainer.js";
import {HeaderTitle} from "./HeaderTitle.js";
import {HeaderLogin} from "./HeaderLogin.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import getPage from "./getPage.js";
import {HeaderDivider} from "./HeaderDivider.js";
import config from "../config.json.proxy.js";
function Header(props) {
  const [page, setPage] = useState(getPage());
  useEffect(() => {
    window.addEventListener("hashchange", () => setPage(getPage));
  }, []);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("header", {
    className: "top-0 fixed h-10 bg-gray-900 w-full z-50"
  }, /* @__PURE__ */ React.createElement(HeaderTitle, null), /* @__PURE__ */ React.createElement(HeaderContainer, {
    side: "right"
  }, /* @__PURE__ */ React.createElement(HeaderButton, {
    link: "about",
    cur: page
  }, "About ", config.botName), /* @__PURE__ */ React.createElement(HeaderButton, {
    link: "commands",
    cur: page
  }, "Commands"), /* @__PURE__ */ React.createElement(HeaderDivider, null), /* @__PURE__ */ React.createElement(HeaderLogin, {
    cur: page
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "h-11"
  }));
}
export default Header;
