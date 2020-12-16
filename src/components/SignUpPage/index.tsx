import React, { Component } from "react";
import { FirebaseContext } from "../Firebase";
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

type Error = {
  message?: string;
};

type SignUpProps = {};
type SignUpState = {
  username?: string;
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
  error?: Error | null;
};

class SignUpFormBase extends Component<any, SignUpState> {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
    console.log(this.state);
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then((authUser: any) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.INDEX);
      })
      .catch((error: Error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
