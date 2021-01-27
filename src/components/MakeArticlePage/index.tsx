import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withAdminAuthorization } from "../Session";

const MakeArticlePage = (props: any) => {
  const [Buser, setUser] = React.useState({ admin: false });
  React.useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        props.firebase.getUserData(user.uid, setUser);
      }
    });
  }, []);
  return <div>make article page</div>;
};

const condition = (authUser: any) => !!authUser;
export default withRouter(
  withFirebase(withAdminAuthorization(condition)(MakeArticlePage))
);
