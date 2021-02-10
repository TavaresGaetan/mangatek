import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { FirebaseContext } from "../../Firebase";
import { withFirebase } from "../../Firebase";
import { useState } from "react";

const BuyingPage = props => {
  return (
    <div>
      <ItemList {...props} />
    </div>
  );
};

const ItemList = props => {
  const [list, setList] = React.useState({});
  const [search, setSearch] = useState("");
  React.useEffect(() => {
    props.firebase.getItems(setList);
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Recherche..."
          onChange={event => {
            setSearch(event.target.value);
          }}
        />
      </div>{" "}
      {Object.entries(list)
        .filter(([key, value]) => {
          if (search == "") {
            return value;
          } else if (
            value.libelle.toLowerCase().includes(search.toLocaleLowerCase())
          ) {
            return value;
          }
        })
        .map(([key, value]) => {
          return <ItemDetails item={value} key={key} {...props} />;
        })}
    </div>
  );
};

const ItemDetails = props => {
  const { item } = props;

  return (
    <div>
      {item.libelle}
      <div>{item.categorie}</div>
      <div>
        <hr />
      </div>

      <Link to={`${ROUTES.BUYING}/${item.id}`}>Show</Link>
    </div>
  );
};

export default withRouter(withFirebase(BuyingPage));
