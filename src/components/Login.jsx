import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Alert } from "evergreen-ui";
import PageTitle from './PageTitle'
import { Container } from "reactstrap";
import Section from "./Section";



// Login component
const Login = () => {

  const history = useHistory();
  const databaseObj = useSelector(state => state.userReducer.user)
  // Set and Get login form values
  const [email, setEmail] = useState(null);
  const [pword, setPWord] = useState(null);
  const [loginErrors, setloginErrors] = useState("");
  const [hasError, setHasError] = useState({
    email: false,
    emailErrorMessage: false,
    password: false,
    passwordErrorMessage: false,
    formAlert: false,
    formAlertErrorMessage: false
  })


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
    checkIfFieldsAreFilled()
    if (checkIfFieldsAreFilled()) {
      console.log(hasError)
    } else {

      dispatch(fetchUser(userObj))

      if (Object.keys(databaseObj).length === 0) {
        setHasError({
          ...hasError,
          email: true,
          password: true,
          formAlert: true,
          formAlertErrorMessage: "Oops! You have entered an incorrect email or password. Please try again."
        })
        return false
      } else {
        console.log(databaseObj)
        history.push("/therapists")
      }
    }
  };

  const checkIfFieldsAreFilled = () => {
    if (!email && !pword) {
      setHasError({
        ...hasError,
        email: true,
        password: true,
        emailErrorMessage: "This field is required",
        passwordErrorMessage: "This field is required"
      })
      return true
    } else if (!email) {
      setHasError({
        ...hasError,
        email: true,
        emailErrorMessage: "This field is required",
      })
      return true
    } else if (!pword) {
      setHasError({
        ...hasError,
        password: true,
        passwordErrorMessage: "This field is required",
      })
      return true
    } else {
      return false
      console.log("Fields have been filled in")
    }
  }

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

  const renderAlert = () => {
    return (
      <Alert intent="danger"
        title={hasError.formAlertErrorMessage}
        marginBottom={32}
      >
      </Alert>
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
              {hasError.formAlert ? renderAlert() : false}
              <form onSubmit={handleSubmit}>
                <TextInputField
                  isInvalid={hasError.email}
                  type="email"
                  className="form-control"
                  id="login_email"
                  label="Email"
                  aria-describedby="emailHelp"
                  placeholder="james@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  inputHeight={48}
                  validationMessage={hasError.emailErrorMessage}
                />
                <TextInputField
                  isInvalid={hasError.password}
                  type="password"
                  label="Password"
                  className="form-control"
                  id="login_password"
                  placeholder="Shhhhhh..."
                  onChange={(e) => setPWord(e.target.value)}
                  value={pword}
                  inputHeight={48}
                  validationMessage={hasError.passwordErrorMessage}
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
