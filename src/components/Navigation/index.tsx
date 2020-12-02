import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

const Navigation = ({ authUser }: any) => (
  <AuthUserContext.Consumer>
    {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SHARE}>Share</Link>
      </li>
      <li>
        <Link to={ROUTES.DISCOVER}>Discover</Link>
      </li>
      <li>
        <Link to={ROUTES.NEWS}>News</Link>
      </li>
      <li>
        <Link to={ROUTES.MARKET}>Market</Link>
      </li>
      <li>
        <Link to={ROUTES.USER}>User</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);
const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SHARE}>Share</Link>
      </li>
      <li>
        <Link to={ROUTES.DISCOVER}>Discover</Link>
      </li>
      <li>
        <Link to={ROUTES.NEWS}>News</Link>
      </li>
      <li>
        <Link to={ROUTES.MARKET}>Market</Link>
      </li>
      <li>
        <Link to={ROUTES.USER}>User</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign up</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
