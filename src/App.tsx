import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";

import Navigation from "./components/Navigation/index";
import DiscoverPage from "./components/DiscoverPage/index";
import MarketPage from "./components/MarketPage";
import IndexPage from "./components/IndexPage/index";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import * as ROUTES from "./constants/routes";

type AppState = {
  authUser?: any | null;
};

class App extends React.Component<any, AppState> {
  listener: any;
  constructor(props: any) {
    super(props);
    this.listener = null;

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      (authUser: any) => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      }
    );
  }
  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />

          <hr />

          <Route exact path={ROUTES.INDEX} component={IndexPage} />
          <Route path={ROUTES.DISCOVER} component={DiscoverPage} />
          <Route path={ROUTES.MARKET} component={MarketPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
