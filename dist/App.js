import hljs from "../_snowpack/pkg/highlightjs.js";
import "../_snowpack/pkg/highlightjs/styles/solarized-dark.css.proxy.js";
import React from "../_snowpack/pkg/react.js";
import Pages from "./components/Pages.js";
import getPage from "./components/getPage.js";
class App extends React.Component {
  constructor(props) {
    super(...arguments);
    this.props = props;
    this.state = {
      page: getPage()
    };
  }
  async componentDidMount() {
    this.update();
    window.addEventListener("hashchange", this.update.bind(this));
  }
  async update() {
    this.setState({
      page: getPage()
    });
  }
  render() {
    let page = this.state.page;
    return /* @__PURE__ */ React.createElement(Pages, {
      url: page
    });
  }
}
export default App;
