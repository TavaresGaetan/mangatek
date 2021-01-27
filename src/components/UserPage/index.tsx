import { type } from "os";
import React, {Component, useState} from "react";
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
      username:"",
      email:"",
      avatar:"",
      error: null,
};

type ProfileState = {
      username?: string;
      email?: string;
      avatar?: any;
      url?: string;
      id?: string;
};

class ProfileDetails extends Component<any, ProfileState> {
      
      constructor(props: any) {
        super(props);

        this.state = { username:'', email:'', avatar:'', url:'',id:''};
        this.props.firebase.auth.onAuthStateChanged((user: any) => {
            if (user) {
              this.props.firebase.getUserData(user.uid, this.changeUserName);
              this.setState({id: user.uid})
            }
      })
      }

      handleChange = e => {
            if (e.target.files[0]) {
                  this.setState({ avatar: e.target.files[0]});
            }

            console.log("avatar: ", this.state.avatar);
      };

      handleUpload = (storage) =>{
            const { avatar } = this.state;
            const uploadTask = storage.ref(`avatars/${this.state.avatar.name}`).put(this.state.avatar);
            uploadTask.on(
               "state_changed",
               snapshot => {},
               error => {
                  console.log(error);
               },
               () => {
                     storage
                        .ref("avatars")
                        .child(this.state.avatar.name)
                        .getDownloadURL()
                        .then(url => {
                              this.setState({ url })
                              this.props.firebase.user(this.state.id).update({url})
                        });
               }   
            );
      };

      changeUserName = (user: any) => {
            console.log(user)
            this.setState({username: user.username, email: user.email, url: user.url})
      } 
      
      render() {
            return <div>
            <input type="file" onChange={this.handleChange} />
            <button onClick={() => {this.handleUpload(this.props.firebase.storage)}}>Upload</button>
            <img src={this.state.url } height="300" width="400"/>
            <div>{this.state.username}</div>
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
