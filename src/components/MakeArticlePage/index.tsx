import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withAdminAuthorization } from "../Session";

const MakeArticlePage = (props: any) => {
  const [articleData, setArticleData] = React.useState({
    titre: "",
    image: "undefined",
    date: new Date().toDateString(),
    body: "",
    signature: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submited", articleData);
  };

  const handleChange = (event: any) => {
    setArticleData({ ...articleData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <p>make article page</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre">Titre de l'article</label> :{" "}
        <input
          type="text"
          onChange={handleChange}
          value={articleData.titre}
          name="titre"
          id="titre"
          placeholder="La nouvelle saison de Doctor Stone"
        />
        <br />
        <textarea
          name="body"
          onChange={handleChange}
          value={articleData.body}
        />
        <br />
        <button type="submit">Valider</button>
      </form>
      <div>
        <p>preview</p>
        <h3> {articleData.titre} </h3>
        <div dangerouslySetInnerHTML={{ __html: articleData.body }}></div>
        <small>
          {" "}
          {articleData.signature} {articleData.date}
        </small>
      </div>
    </>
  );
};

const condition = (authUser: any) => !!authUser;
export default withRouter(
  withFirebase(withAdminAuthorization(condition)(MakeArticlePage))
);
