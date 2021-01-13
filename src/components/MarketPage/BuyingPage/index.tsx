import { type } from "os";
import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { FirebaseContext } from "../../Firebase";
import { withFirebase } from "../../Firebase";

const BuyingPage = (props: any) => {

  return (
  <div>
      <ItemList {...props} />

 
  </div>
  );

};




const ItemList = (props: any) =>{

 

const [list, setList] = React.useState({})
React.useEffect (()=> {
      props.firebase.getItems( setList);
},[])

  

       return <div> {Object.entries(list).map(([key,value]) => {
         
            return   <ItemDetails item = {value} key = {key} {...props} />
            ;
         
           })}</div>


}

const ItemDetails  = (props: any) =>{


      const {item}=props;

      

     

            return <div>{item.libelle}
            <div>{item.categorie}</div>
            <div>
                  <hr/>
            </div>
            
            </div>
            ;
      
}


export default withRouter(withFirebase(BuyingPage));
