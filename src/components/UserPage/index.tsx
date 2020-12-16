import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const UserPage = () => {

  return (
  <div>
  <div>User PAGE</div>
  <Link to ={ROUTES.WATCHLIST}>
  <button>
        Watchlist
  </button>
  </Link>
  <Link to ={ROUTES.BOOKSHELF}>
  <button>
        Bookshelf
  </button>
  </Link>
  </div>
  );

};

export default UserPage;
