import React from "react";
import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = (condition: any) => (Component: any) => {
  class WithAuthorization extends React.Component<any, any> {
    listener: any;
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: any) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

const withAdminAuthorization = (condition: any) => (Component: any) => {
  class WithAuthorization extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { admin: false };
    }
    getAdminField = (user: any) => {
      this.setState({ admin: user.admin });
    };
    listener: any;
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: any) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          } else {
            this.props.firebase.getUserData(authUser.uid, this.getAdminField);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <>
          {this.state.admin ? (
            <Component {...this.props} />
          ) : (
            <p> You need to be admin to access this page </p>
          )}
        </>
      );
    }
  }

  return withRouter(withFirebase(WithAuthorization));
};

export { withAdminAuthorization };
export default withAuthorization;
