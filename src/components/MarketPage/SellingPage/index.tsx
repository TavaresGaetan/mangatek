import React from "react";
import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { withAuthorization } from "../../Session";


const SellingPage = (props:any) => {
  const [sellingData, setSellingData]= React.useState({
    image: undefined,
    libelle:"", 
    prix:0,
    quantite:0,
    categorie:"",   
    etat:"",
    auteur:"",
    studio:"",
    collection:"",
    format:"",
    soustitre:"",
    dimensions:"",
    poids:0,
    materiaux:""
  })
  const handleSubmit = (event : React.FormEvent <HTMLFormElement>) => {
    event.preventDefault()
    props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        props.firebase.addItemForSelling(user.uid, sellingData);
      }
    });
    console.log(sellingData)
  }

  const handleChange = (event : React.ChangeEvent <HTMLInputElement>) => {
    setSellingData({...sellingData,[event.target.name] : event.target.value})

  }
  return <div>
          <div> Selling </div>
          <div >
            <h2>Article à Vendre</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="image">Choisir une image</label> : <input type="file" onChange={handleChange}  name="image" id="image"/><br/><br/> 
              <label htmlFor="libelle">Titre/Libellé</label> : <input type="text" onChange={handleChange} value={sellingData['libelle']} name="libelle" id="libelle" placeholder="ex : Nom de l'article"/><br/><br/> 
              <label htmlFor="prix">Prix</label> : <input type="number" onChange={handleChange} value={sellingData['prix']} name="prix" id="prix" placeholder="ex : DVD, Livre, figurine"/> <br/><br/>
              <label htmlFor="quantite">Quantité</label> : <input type="number" onChange={handleChange} value={sellingData['quantite']} name="quantite" id="quantite"/><br/>
              <p>
                Sélectionner la catégorie : <br/>
                <input type="radio" name="categorie" id="dvd" onChange={handleChange} value="dvd" /><label htmlFor="dvd">DVD</label><br/>
                <input type="radio" name="categorie" id="livre" onChange={handleChange} value="livre"/><label htmlFor="livre">Livre</label><br/>
                <input type="radio" name="categorie" id="figurine" onChange={handleChange} value="figurine"/><label htmlFor="figurine">Figurine</label><br/>
                <input type="radio" name="categorie" id="goodies" onChange={handleChange} value="goodies"/><label htmlFor="goodies">Goodies</label><br/>
              </p>
              <p>
                Sélectionner l'état de l'article : <br/>
                <input type="radio" name="etat" id="neuf" onChange={handleChange} value="neuf"/><label htmlFor="neuf">neuf</label><br/>
                <input type="radio" name="etat" id="tresbonetat" onChange={handleChange} value="tresbonetat"/><label htmlFor="tresbonetat">très bon état</label><br/>
                <input type="radio" name="etat" id="bonetat" onChange={handleChange} value="bonetat"/><label htmlFor="bonetat">bon état</label><br/>
                <input type="radio" name="etat" id="etatmoyen" onChange={handleChange} value="etatmoyen"/><label htmlFor="etatmoyen">état moyen</label><br/>
              </p>
              <label htmlFor="auteur">Auteur</label> : <input type="text" onChange={handleChange} value={sellingData['auteur']} name="auteur" id="auteur" placeholder="ex : Robert Jones"/><br/><br/>
              <label htmlFor="studio">Studio</label> : <input type="text" onChange={handleChange} value={sellingData['studio']} name="studio" id="studio" placeholder="ex : Disney Studio"/><br/><br/>
              <label htmlFor="collection">Collection</label> : <input type="text" onChange={handleChange} value={sellingData['collection']} name="collection" id="collection" placeholder="saisir une collection"/><br/><br/>
              <label htmlFor="format">Format</label> : <input type="text" onChange={handleChange} value={sellingData['format']} name="format" id="format" placeholder="ex : DVD, Blu-ray, ..."/><br/><br/>
              <label htmlFor="soustitre">Sous-titre</label> : <input type="text" onChange={handleChange} value={sellingData['soustitre']} name="soustitre" id="soustitre" placeholder="saisir un sous-titre"/><br/><br/>
              <label htmlFor="dimensions">Dimensions</label> : <input type="text" onChange={handleChange} value={sellingData['dimensions']} name="dimensions" id="dimensions" placeholder="ex : L x l x H -> 26x15x7"/><br/><br/>
              <label htmlFor="poids">Poids</label> : <input type="text" onChange={handleChange} value={sellingData['poids']} name="poids" id="poids" placeholder="ex : DVD, Livre, figurine"/><br/><br/>
              <label htmlFor="materiaux">Matériaux</label> : <input type="text" onChange={handleChange} value={sellingData['materiaux']} name="materiaux" id="materiaux" placeholder="ex : métal, bois, etc"/><br/><br/>
            
            <button type="submit">Vendre</button>
            </form>
        </div>
        <div>
        </div>
        </div>;
};



const condition = (authUser: any) => !!authUser;
export default withRouter(
  withFirebase(withAuthorization(condition)(SellingPage))
);