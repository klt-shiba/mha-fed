import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Alert } from "evergreen-ui";
import PageTitle from './PageTitle'
import { Container } from "reactstrap";
import Section from "./Section";
import ButtonWrapper from "./ButtonWrapper";



// Login component
const Login = () => {

  const history = useHistory();
  const databaseObj = useSelector(state => state.userReducer.user)
  const errorObj = useSelector(state => state.userReducer.error)
  const [isLoading, setIsLoading] = useState(false)
  // Set and Get login form values
  const [email, setEmail] = useState(null);
  const [pword, setPWord] = useState(null);
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
      checkIfUserCreated()
    }
  };

  const checkIfUserCreated = () => {
    if (Object.keys(errorObj).length >= 1) {
      setHasError({
        ...hasError,
        email: true,
        password: true,
        formAlert: true,
        formAlertErrorMessage: "Oops something went wrong, please try again"
      })
      setIsLoading(false)
    } else {
      return false
    }
  }


  const redirectUserAfterUserAuthenticated = () => {
    console.log("running")
    if (Object.keys(databaseObj).length === 0) {
      return false
    } else {
      console.log(databaseObj)
      setIsLoading(false)
      history.push(`/therapists`)
    }
  }
  useEffect(() => {
    redirectUserAfterUserAuthenticated()
  }, [databaseObj])

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
        hasBackgroundColour="#bba4dc"
        title="Log in"
        summary="Take that first step and find professionals who are available now"
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
                  <ButtonWrapper>
                    <Button
                      type="submit"
                      appearance="primary"
                      size="large"
                      height={48}
                      fontSize="17px">
                      Login
                    </Button>
                  </ButtonWrapper>
                </Pane>
              </form>
            </Pane>
          </Pane>
        </Container>
      </Section >
    </>
  );
};

export default Login;
