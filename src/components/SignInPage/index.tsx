import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUpPage";
import { withFirebase } from "../Firebase";
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

const SignInPage = () => (
  <Flex width="full" align="center" justifyContent="center">
    <Box p={2}>
      <Box textAlign="center">
        <Heading>Sign in</Heading>
      </Box>
      <Box my={4} textAlign="center">
        <SignInForm />
        <SignUpLink />
      </Box>
    </Box>
  </Flex>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

type Error = {
  message?: string;
};

type SignInState = {
  username?: string;
  email?: string;
  password?: string;
  error?: Error | null;
};

class SignInFormBase extends Component<any, SignInState> {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.INDEX);
      })
      .catch((error: Error) => {
        console.log("eorr", error);
        this.setState({ error });
        console.log("thisstate", this.state);
      });

    event.preventDefault();
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <FormControl id="email">
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
        <FormControl mt={6} id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
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
          Sign In
        </Button>
        {error && (
          <Text fontSize="xs" color="red.400">
            {error.message}
          </Text>
        )}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
