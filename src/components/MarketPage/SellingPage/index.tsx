import React from "react";

const SellingPage = () => {
  const [sellingData, setSellingData]= React.useState({
    image: undefined,
    libelle:"", 
    prix:0,
    quantite:0,
    /*categorie,*/
    /*etat,*/
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
              <label htmlFor="image">Choisir une image</label> : <input type="file" onChange={handleChange} value={sellingData['image']} name="image" id="image"/><br/><br/> 
              <label htmlFor="libelle">Titre/Libellé</label> : <input type="text" onChange={handleChange} value={sellingData['libelle']} name="libelle" id="libelle" placeholder="ex : Nom de l'article"/><br/><br/> 
              <label htmlFor="prix">Prix</label> : <input type="number" onChange={handleChange} value={sellingData['prix']} name="prix" id="prix" placeholder="ex : DVD, Livre, figurine"/> <br/><br/>
              <label htmlFor="quantite">Quantité</label> : <input type="number" onChange={handleChange} value={sellingData['quantite']} name="quantite" id="quantite"/><br/>
              <p>
                Sélectionner la catégorie : <br/>
                <input type="checkbox" name="dvd" id="dvd"/><label htmlFor="categorie">DVD</label><br/>
                <input type="checkbox" name="livre" id="livre"/><label htmlFor="livre">Livre</label><br/>
                <input type="checkbox" name="figurine" id="figurine"/><label htmlFor="figurine">Figurine</label><br/>
                <input type="checkbox" name="goodies" id="goodies"/><label htmlFor="goodies">Goodies</label><br/>
              </p>
              <p>
                Sélectionner l'état de l'article : <br/>
                <input type="radio" name="neuf" id="neuf"/><label htmlFor="neuf">neuf</label><br/>
                <input type="radio" name="tresbonetat" id="tresbonetat"/><label htmlFor="tresbonetat">très bon état</label><br/>
                <input type="radio" name="bonetat" id="bonetat"/><label htmlFor="bonetat">bon état</label><br/>
                <input type="radio" name="etatmoyen" id="etatmoyen"/><label htmlFor="etatmoyen">état moyen</label><br/>
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



export default SellingPage;