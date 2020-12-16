import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const MarketPage = () => {
  return <div> Market <Link to={ROUTES.SELLING}>Selling</Link></div>;
};

export default MarketPage;