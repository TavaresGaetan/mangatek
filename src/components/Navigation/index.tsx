import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Navigation = () => (
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
    </ul>
  </div>
);

export default Navigation;
