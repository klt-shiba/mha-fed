import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputField, Pane, Button, Alert } from "evergreen-ui";
import PageTitle from './PageTitle'
import { Container } from "reactstrap";
import Section from "./Section";
import { GoogleAPI, GoogleLogin, GoogleLogout } from 'react-google-oauth';




// Login component
const Login = () => {

  const history = useHistory();
  const databaseObj = useSelector(state => state.userReducer.user)
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
  const redirectUserAfterUserAuthenticated = () => {
    console.log("running")
    if (Object.keys(databaseObj).length === 0) {
      return false
    } else {
      console.log(databaseObj)
      const id = databaseObj.data.id
      setIsLoading(false)
      history.push(`/therapists`)
    }
  }
  useEffect(() => {
    redirectUserAfterUserAuthenticated()
  }, [databaseObj])

  // const responseGoogle = (response) => {
  //   var token = google_response.Zi;
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${google_response.Zi.accessToken}`,
  //       'Content-Type': 'application/json',
  //       'access_token': `${google_response.Zi.accessToken}`
  //     },
  //     body: JSON.stringify(token)
  //   }

  //   return fetch(`backend rails api url to google sign in path`, requestOptions)
  //     .then(response => {
  //       Cookie.set('accesstoken', response.headers.get('access-token'), {
  //         expires: 7
  //       });
  //       Cookie.set('client', response.headers.get('client'), { expires: 7 });
  //       Cookie.set('tokentype', response.headers.get('token-type'), { expires: 7 });
  //       Cookie.set('expiry', response.headers.get('expiry'), { expires: 7 });
  //       Cookie.set('uid', response.headers.get('uid'), { expires: 7 });
  //     })
  // };


  const googleOAuth = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://127.0.0.1:3001/auth/google_oauth2/callback&client_id=84038256684-s3gk4tqvv85r39v4af0tpqoiogqacgjv.apps.googleusercontent.com";
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
          <button type="" className="btn btn-primary" onClick={googleOAuth}>
            Sign in with Google
          </button>

          {/* <GoogleAPI className="GoogleLogin" clientId="Your client API Key">
            <div>
              <GoogleLogin height="10" width="500px" backgroundColor="#4285f4" access="offline" scope="email profile" onLoginSuccess={responseGoogle} onFailure={responseGoogle} />
            </div>
          </GoogleAPI> */}
        </Container>
      </Section>
    </>
  );
};

export default Login;
