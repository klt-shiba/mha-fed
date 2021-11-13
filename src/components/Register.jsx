import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Card, Heading, Text, majorScale } from "evergreen-ui";


const Register = () => {
  // SET and GET Register form variables
  const [email, setEmail] = useState("");
  const [pword, setPWord] = useState("");
  const [loginErrors, setloginErrors] = useState("");


  const dispatch = useDispatch();
  const history = useHistory();

  const userObj = {
    user: {
      email: email,
      password: pword,
      password_confirmation: pword,
    },
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUserUp(userObj));
  };

  const databaseObj = useSelector(state => state.userReducer.user)

  const redirectCreateProfile = (obj) => {
    if (Object.keys(databaseObj).length === 0) {
      console.log("Empty")
    } else if (databaseObj.hasOwnProperty('error')) {
      // Add Error states to form
    } else {
      const id = databaseObj.data.id
      history.push(`/users/${id}/getting-started`)
    }
  }

  useEffect(() => {
    redirectCreateProfile()
  });

  const handleClick = (e) => {
    console.log(e);
  };

  const googleOAuth = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://127.0.0.1:3000/auth/google_oauth2/callback&client_id=84038256684-s3gk4tqvv85r39v4af0tpqoiogqacgjv.apps.googleusercontent.com";
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
              marginY={majorScale(1)}>Create an account</Heading>
            <Text
              size={600}
              textAlign="center">
              Take that first step and book with these professional therapists who
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
                label="Email address"
                className="form-control"
                id="register_email"
                aria-describedby="register_email"
                // description="This is a description."
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextInputField
                type="password"
                label="Password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPWord(e.target.value)}
                value={pword}
              />
              <Button
                type="submit"
                appearance="primary" >
                Create account
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


export default Register;
