import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation/index";
import DiscoverPage from "./components/DiscoverPage/index";
import MarketPage from "./components/MarketPage";
import IndexPage from "./components/IndexPage/index";
import * as ROUTES from "./constants/routes";
import UserPage from "./components/UserPage";
import Watchlist from "./components/UserPage/watchlist";
import Bookshelf from "./components/UserPage/bookshelf";

function App() {
  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.INDEX} component={IndexPage} />
        <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
        <Route path={ROUTES.MARKET} component={MarketPage} />
        <Route path={ROUTES.USER} component={UserPage} />
        <Route path={ROUTES.WATCHLIST} component={Watchlist} />
        <Route path={ROUTES.BOOKSHELF} component={Bookshelf} />
      </div>
    </Router>
  );
}

export default App;
