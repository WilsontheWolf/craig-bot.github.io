
import hljs from "highlight.js";
import 'highlight.js/styles/solarized-dark.css';
import React from 'react';
import Pages from "./components/Pages";
import getPage from './components/getPage';

class App extends React.Component {
    constructor(props) {
        super(...arguments)
        this.props = props
        this.state = {
            page: getPage()
        };

    }

    async componentDidMount() {
        this.update();
        window.addEventListener('hashchange', this.update.bind(this));
    }

    async update() {
        this.setState({
            page: getPage()
        })
    }
    // I'm keeping this code for later
    // componentDidUpdate() {
    //     document.querySelectorAll("pre code").forEach(block => {
    //         hljs.highlightBlock(block);
    //     });

    // }

    render() {
        let page = this.state.page;
        return <Pages url={page} />
    }
}


export default App;
