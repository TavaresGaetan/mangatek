import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../Session";

class IndexPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.props.firebase.getUserData(user.uid, console.log);
      }
    });
  }

  render() {
    return <div>INDEX</div>;
  }
}

const condition = (authUser: any) => !!authUser;
export default withRouter(
  withFirebase(withAuthorization(condition)(IndexPage))
);
