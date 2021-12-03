import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch } from "react-redux";
import { TextInputField, Pane, Button, majorScale } from "evergreen-ui";
import PageTitle from './PageTitle'
import { Container } from "reactstrap";
import Section from "./Section";
import FormCard from "./FormCard"


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

  const renderFields = () => {

    return (
      <Pane>
        <TextInputField
          type="email"
          className="form-control"
          id="login_email"
          label="Email"
          aria-describedby="emailHelp"
          placeholder="james@email.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          inputHeight={48}
        />
        <TextInputField
          type="password"
          label="Password"
          className="form-control"
          id="login_password"
          placeholder="Shhhhhh..."
          onChange={(e) => setPWord(e.target.value)}
          value={pword}
          inputHeight={48}
        />
      </Pane>
    )
  }

  return (
    <>
      <PageTitle
        isSmall
        title="Log in"
        summary="Take that first step and find professionals who are available now"
        src="https://images.unsplash.com/photo-1559740451-b895701fa4b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
      />
      <Section
        backgroundColour="#fafafa"
        hasPaddingTop
        hasPaddingBottom>
        <Container fluid="xl">

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
                  className="form-control"
                  id="login_email"
                  label="Email"
                  aria-describedby="emailHelp"
                  placeholder="james@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  inputHeight={48}
                />
                <TextInputField
                  type="password"
                  label="Password"
                  className="form-control"
                  id="login_password"
                  placeholder="Shhhhhh..."
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
                      Login
                    </Button>
                  </Pane>
                </Pane>

              </form>
            </Pane>
          </Pane>
          {/* <button type="" className="btn btn-primary" onClick={googleOAuth}>
          Sign in with Google
        */}
        </Container>
      </Section>
    </>
  );
};

export default Login;
