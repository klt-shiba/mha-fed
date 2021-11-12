import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch } from "react-redux";
import { TextInputField, Pane, Button, Card, Heading, Text, majorScale } from "evergreen-ui";


// Login component
const Login = () => {

  const history = useHistory();

  // Set and Get login form values
  const [email, setEmail] = useState("");
  const [pword, setPWord] = useState("");
  const [loginErrors, setloginErrors] = useState("");

  const dispatch = useDispatch();

  const userObj = {
    user: {
      email: email,
      password: pword,
    },
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userObj)
    dispatch(fetchUser(userObj));
    history.push("/therapists")
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      className="vbox">
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginY={majorScale(4)}>

        <Pane
          max-width="480px"
          display="block"
          textAlign="center">
          <Pane>
            <Heading
              size={900}
              is="h1"
              textAlign="center"
              marginY={majorScale(1)}>Login</Heading>
            <Text
              size={600}
              textAlign="center">
              Login to make an appoint book with these professional therapists who
              are available now.
            </Text>
          </Pane>
          <Pane
            display="block"
            alignItems="center"
            justifyContent="center"
            textAlign="left"
            marginY={majorScale(3)}
          >
            <form onSubmit={handleSubmit}>
              <TextInputField
                type="email"
                className="form-control"
                id="login_email"
                label="Email"
                aria-describedby="emailHelp"
                placeholder="james@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextInputField
                type="password"
                label="Password"
                className="form-control"
                id="login_password"
                placeholder="Shhhhhh..."
                onChange={(e) => setPWord(e.target.value)}
                value={pword}
              />
              <Button
                type="submit"
                appearance="primary" >
                Login
              </Button>
            </form>
            {/* <button type="" className="btn btn-primary" onClick={googleOAuth}>
          Sign in with Google
        </button> */}
          </Pane>
        </Pane >
      </Pane>
    </Pane >

  );
};

export default Login;
