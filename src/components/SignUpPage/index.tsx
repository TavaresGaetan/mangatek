import React, { Component } from "react";
import { FirebaseContext } from "../Firebase";
import { withFirebase } from "../Firebase";
import { Link as ReachLink, withRouter } from "react-router-dom";
import { Link } from "@chakra-ui/react";

import * as ROUTES from "../../constants/routes";

import {
  FormControl,
  Box,
  FormLabel,
  Button,
  Text,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";

const SignUpPage = () => (
  <Flex width="full" align="center" justifyContent="center">
    <Box p={2}>
      <Box textAlign="center">
        <Heading>Sign up</Heading>
      </Box>
      <Box my={4} textAlign="center" minW="md">
        <SignUpForm />
      </Box>
    </Box>
  </Flex>
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
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
            required
          />
        </FormControl>
        <FormControl mt={6} id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            required
          />
        </FormControl>
        <FormControl mt={6} id="passwordOne">
          <FormLabel>Password</FormLabel>
          <Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            required
          />
        </FormControl>
        <FormControl mt={6} id="passwordTwo">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </FormControl>
        <Button
          colorScheme="teal"
          variant="outline"
          width="full"
          mt={4}
          mb={4}
          disabled={isInvalid}
          type="submit"
        >
          Sign Up
        </Button>
        {error && (
          <Text fontSize="xs" color="red.400">
            {error.message}
          </Text>
        )}

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account?{" "}
    <Link color="teal.500" as={ReachLink} to={ROUTES.SIGN_UP}>
      Sign Up
    </Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
