import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { withAuthentication } from "./components/Session";

import Navigation from "./components/Navigation/index";
import DiscoverPage from "./components/DiscoverPage/index";
import MarketPage from "./components/MarketPage";
import IndexPage from "./components/IndexPage/index";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import * as ROUTES from "./constants/routes";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.INDEX} component={IndexPage} />
        <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
        <Route path={ROUTES.MARKET} component={MarketPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);
