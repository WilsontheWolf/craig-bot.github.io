import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

import {Button} from "./Button.js";
import {Banner} from "./Banner.js";
import {compiler} from "../../_snowpack/pkg/markdown-to-jsx.js";
import React from "../../_snowpack/pkg/react.js";
const MDXInline = ({children: text, overrides, allowHTML = true}) => {
  return compiler(text, {
    overrides: {
      ...{
        a: {
          props: {
            className: "text-blue-500 hover:text-blue-400 focus:text-blue-400 focus:outline-none"
          }
        },
        h1: {
          props: {
            className: "text-4xl"
          }
        },
        h2: {
          props: {
            className: "text-3xl"
          }
        },
        Banner,
        Button,
        code: {
          props: {
            className: "bg-gray-900 rounded-md pt-1 px-1"
          }
        }
      },
      ...overrides
    },
    createElement(type, props, children) {
      if (type === "img")
        props.src = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_URL + "/images/" + props.src;
      if (props.forceClass)
        props.class = props.forceClass;
      return React.createElement(type, props, children);
    },
    disableParsingRawHTML: !allowHTML,
    wrapper: null
  });
};
export default MDXInline;
