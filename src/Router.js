import DaoHome from "./view/daoHome"
import App from "./App"
import React, {Component} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={App}></Route>
                    <Route exact path="/page1" element = {DaoHome}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
export default Router
