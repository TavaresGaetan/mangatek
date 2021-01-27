import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

import Calendar from "./Calendar";

const NewsPage = (props: any) => {
  const [user, setUser] = React.useState({ admin: false });
  React.useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        props.firebase.getUserData(user.uid, setUser);
      }
    });
  }, []);
  return (
    <div>
      {user.admin ? (
        <Link to={ROUTES.MAKE_ARTICLE}>Créer un article</Link>
      ) : null}
      news
      <Calendar />
    </div>
  );
};

export default withRouter(withFirebase(NewsPage));
