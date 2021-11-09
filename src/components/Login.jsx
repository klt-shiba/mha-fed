import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchUser } from "../reducers/userActions";
import { useDispatch } from "react-redux";


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
    <div className="">
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Login</h1>
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
              <label htmlFor="login_email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="login_email"
                aria-describedby="emailHelp"
                placeholder="james@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="login_password">Password</label>
              <input
                type="password"
                className="form-control"
                id="login_password"
                placeholder="Shhhhhh..."
                onChange={(e) => setPWord(e.target.value)}
                value={pword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <button type="" className="btn btn-primary">
            Login with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
