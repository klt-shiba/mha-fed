import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Alert } from "evergreen-ui";
import PageTitle from "./PageTitle";
import { Container } from "reactstrap";
import Section from "./Section";
import LinearProgress from '@mui/material/LinearProgress';



const Register = () => {
  // SET and GET Register form variables
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [pword, setPWord] = useState("");
  const [hasError, setHasError] = useState({
    email: false,
    emailErrorMessage: false,
    password: false,
    passwordErrorMessage: false,
    formAlert: false,
    formAlertErrorMessage: false
  })

  const token = localStorage.getItem('token')

  const databaseObj = useSelector(state => state.userReducer.user)

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
    checkIfFieldsAreFilled()
    if (checkIfFieldsAreFilled()) {
      console.log("failing")
    } else {
      setIsLoading(true)
      dispatch(signUserUp(userObj));
      checkIfUserCreated()
    }
  };


  const checkIfUserCreated = () => {
    if (Object.keys(databaseObj).length === 0) {
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


  const redirectUserAfterUserCreated = () => {
    console.log("running")
    if (Object.keys(databaseObj).length === 0) {
      return false
    } else {
      console.log(databaseObj)
      const id = databaseObj.data.id
      setIsLoading(false)
      history.push(`/users/${id}/getting-started`)
    }
  }
  useEffect(() => {
    redirectUserAfterUserCreated()
  }, [databaseObj])


  const checkIfFieldsAreFilled = () => {
    setHasError({
      email: false,
      emailErrorMessage: false,
      password: false,
      passwordErrorMessage: false,
      formAlert: false,
      formAlertErrorMessage: false
    })
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
      console.log("Fields have been filled in")
      return false
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
        title="Create an account"
        summary="Take that first step and book with these professional therapists who
        are available now."
      />
      {isLoading ? <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} /> : false}
      <Section
        hasPaddingTop
        hasPaddingBottom
        backgroundColour="#fafafa">
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
                  validationMessage={hasError.emailErrorMessage}
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
                  isInvalid={hasError.password}
                  validationMessage={hasError.passwordErrorMessage}
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
                      size="large"
                      height={48}
                      fontSize="17px">
                      Create account
                    </Button>
                  </Pane>
                </Pane>

              </form>
            </Pane>
          </Pane>
          {/* <button type="" className="btn btn-primary" onClick={googleOAuth}>
            Sign in with Google
          </button> */}
        </Container >
      </Section>

    </>
  );
};


export default Register;
