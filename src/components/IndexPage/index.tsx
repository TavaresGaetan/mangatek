import React from "react";
import { withAuthorization } from "../Session";

const IndexPage = () => {
  return <div>INDEX</div>;
};

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(IndexPage);
