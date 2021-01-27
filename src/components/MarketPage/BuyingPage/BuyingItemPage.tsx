import React from 'react'
import {useParams, withRouter} from "react-router-dom";
import { withFirebase } from '../../Firebase';

 function BuyingItemPage(props:any) {

const {id} = useParams();
  

        const [item, setItem] = React.useState({libelle:""})
        React.useEffect (()=> {
              props.firebase.getItem( id, setItem);
        },[])
        
        
        
               return <div> 
                 
                    {item.libelle}
                 
                </div>
        
        
        




    
}
export default withRouter(withFirebase(BuyingItemPage));