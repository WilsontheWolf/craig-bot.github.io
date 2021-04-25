import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import loader from "../../images/loader.svg.proxy.js";
import MDXPage from "./MDXPage.js";
import {Banner} from "../components/Banner.js";
const Docs = {
  Page: ({url}) => {
    const [pageData, updatePageData] = useState(null);
    const [currentPage, changePage] = useState(null);
    useEffect(() => {
      (async () => {
        try {
          const data = await fetch(`${__SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL}/docs/info.json`);
          if (!data.ok)
            updatePageData("Error fetching docs data! Please reload and try again.");
          updatePageData(await data.json());
        } catch (e) {
          updatePageData("Error fetching docs data! Please reload and try again.");
        }
      })();
    }, []);
    useEffect(() => {
      const [, p] = url.match(/^docs(?:\/(\w+))?$/);
      if (!p) {
        if (!pageData?.main)
          return;
        window.location.href = `#/docs/${pageData.main}`;
      } else
        changePage(p);
    }, [pageData, url]);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
      className: "fixed top-0 h-screen box-border pt-12 pb-2 w-52 md:ml-5 ml-2"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "bg-gray-900 h-full box-border rounded-lg p-1 px-2 overflow-y-auto"
    }, pageData ? typeof pageData === "string" ? pageData : pageData.cats.map((cat) => [
      /* @__PURE__ */ React.createElement("h1", {
        className: "w-full text-xl text-left px-1"
      }, cat.name),
      pageData.pages.filter((p) => p.cat === cat.id).map((page) => /* @__PURE__ */ React.createElement("button", {
        className: `w-full rounded text-left ${currentPage === page.id ? "bg-blue-500" : "hover:bg-gray-500"} px-1`,
        onClick: () => window.location.href = `#/docs/${page.id}`
      }, page.name))
    ]) : /* @__PURE__ */ React.createElement("img", {
      className: "m-auto",
      src: loader
    }))), /* @__PURE__ */ React.createElement(Banner, {
      type: "warn",
      className: "ml-60 md:mr-10 mr-5"
    }, "The docs are incomplete and data might be missing."), /* @__PURE__ */ React.createElement(MDXPage.Page, {
      url: !currentPage ? null : pageData?.pages.find((p) => p.id === currentPage)?.url || "missingPage",
      path: "/docs/",
      className: "ml-60 md:mr-10 mr-5"
    }));
  },
  match: /^docs(?:\/.*)?$/
};
export default Docs;
