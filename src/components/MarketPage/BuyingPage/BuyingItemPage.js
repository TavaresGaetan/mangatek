import React from "react";
import { useParams, withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";

function BuyingItemPage(props) {
  const { id } = useParams();

  const [item, setItem] = React.useState({
    auteur: "",
    categorie: "",
    collection: "",
    dimension: "",
    etat: "",
    format: "",
    image: "",
    libelle: "",
    materiaux: "",
    poids: "",
    prix: "",
    quantite: "",
    soustitre: "",
    studio: "",
    uid: ""
  });
  React.useEffect(() => {
    props.firebase.getItem(id, setItem);
  }, []);

  return (
    <div>
      {item.auteur}
      <div>{item.categorie}</div>
      <div>{item.collection}</div>
      <div>{item.dimension}</div>
      <div>{item.etat}</div>
      <div>{item.format}</div>
      <div>{item.image}</div>
      <div>{item.libelle}</div>
      <div>{item.materiaux}</div>
      <div>{item.poids}</div>
      <div>{item.prix}</div>
      <div>{item.quantite}</div>
      <div>{item.soustitre}</div>
      <div>{item.studio}</div>
      <div>{item.uid}</div>
    </div>
  );
}
export default withRouter(withFirebase(BuyingItemPage));
