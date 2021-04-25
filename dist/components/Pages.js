import Docs from "../pages/Docs.js";
import Index from "../pages/Index.js";
import MDXPage from "../pages/MDXPage.js";
import Commands from "../pages/Commands.js";
import React from "../../_snowpack/pkg/react.js";
import Login from "../pages/Login.js";
import User from "../pages/User.js";
import Callback from "../pages/Callback.js";
import Guilds from "../pages/Guilds.js";
import Invite from "../pages/Invite.js";
import ManageGuild from "../pages/ManageGuild.js";
const pages = [
  Index,
  Docs,
  Commands,
  Login,
  User,
  Guilds,
  Callback,
  Invite,
  ManageGuild
];
function Pages({url}) {
  let Page;
  Page = pages.find((p) => url.match(p.match));
  if (!Page)
    Page = MDXPage;
  return /* @__PURE__ */ React.createElement(Page.Page, {
    url
  });
}
export default Pages;
