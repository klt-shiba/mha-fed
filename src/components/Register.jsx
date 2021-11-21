import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Heading, Text, majorScale } from "evergreen-ui";
import PageTitle from "./PageTitle";
import { Container } from "reactstrap";
import Section from "./Section";


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
    <>
      <PageTitle
        isSmall
        title="Create an account"
        summary="Take that first step and book with these professional therapists who
        are available now."
      />
      <Container fluid="xl">
        <Section>
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="left">
            <Pane
              width="100%"
              maxWidth='720px'>
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
                  inputHeight={48}
                />
                <TextInputField
                  type="password"
                  label="Password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPWord(e.target.value)}
                  value={pword}
                  inputHeight={48}
                />
                <Pane display="flex">
                  <Pane flex={1} alignItems="center" display="flex">

                  </Pane>
                  <Pane>
                    <Button
                      type="submit"
                      appearance="primary"
                      size="large" >
                      Create account
                    </Button>
                  </Pane>
                </Pane>

              </form>
            </Pane>
          </Pane>
        </Section>
        {/* <button type="" className="btn btn-primary" onClick={googleOAuth}>
            Sign in with Google
          </button> */}

      </Container >
    </>
  );
};


export default Register;
