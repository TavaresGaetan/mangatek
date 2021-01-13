import { type } from "os";
import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import { withFirebase } from "../Firebase";

const UserPage = () => {

  return (
  <div>
  <ProfileBase />
  </div>
  );

};

const INITIAL_STATE = {
      username: "",
      email: "",
      error: null,
};

type ProfileState = {
      username?: string;
      email?: string;
};


class ProfileDetails extends Component<any, ProfileState> {
      
      constructor(props: any) {
        super(props);

        this.state = { username:'', email:''};
        this.props.firebase.auth.onAuthStateChanged((user: any) => {
            if (user) {
              this.props.firebase.getUserData(user.uid, this.changeUserName);
            }
      })
      }

      changeUserName = (user: any) => {
            console.log(user)
            this.setState({username: user.username, email: user.email})
      } 
      
      render() {
            return <div>{this.state.username}
            <div>{this.state.email}</div>
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
            ;
      }
}

const ProfileBase = withRouter(withFirebase(ProfileDetails));
export default UserPage;
