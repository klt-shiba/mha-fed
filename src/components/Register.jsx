import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";

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
      history.push(`/users/${id}/create`)
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
    <div className="">
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Create an account</h1>
          <p className="lead text-muted">
            Login to make an appoint book with these professional therapists who
            are available now.
          </p>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid">
        <div className="container py-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="register_email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="register_email"
                aria-describedby="register_email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPWord(e.target.value)}
                value={pword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </form>
          {/* <button type="" className="btn btn-primary" onClick={googleOAuth}>
            Sign in with Google
          </button> */}
        </div>
      </section>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signUserUp: (userInfo) => dispatch(signUserUp(userInfo)),
//   };
// };

export default Register;
