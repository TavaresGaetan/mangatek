import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation/index";
import DiscoverPage from "./components/DiscoverPage/index";
import IndexPage from "./components/IndexPage/index";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.INDEX} component={IndexPage} />
        <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
      </div>
    </Router>
  );
}

export default App;
