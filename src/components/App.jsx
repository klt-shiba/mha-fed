import React, { useEffect } from "react";
import { logUserOut } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Therapists from "../components/Therapists";
import Therapist from "../components/Therapist";
import Login from "../components/Login";
import Register from "../components/Register";
import EditUserType from "../components/EditUserType";
import EditIssues from "./EditIssues";
import Footer from "./Footer";
import CreateReview from "../components/CreateReview";
import NavBar from "./NavBar";


const App = () => {

  const databaseObj = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    console.log(databaseObj);
    RenderButton();
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logUserOut());
  };

  const RenderButton = () => {
    return (
      <div className="container">
        <span id="logout_signin">
          {!token ? (
            <button className="btn btn-lg custom-button" role="button">
              Login
            </button>
          ) : (
            <button
              className="btn btn-lg custom-button"
              role="button"
              onClick={handleClick}
            >
              Log out of website
            </button>
          )}
        </span>
        <span id="create_edit_account">
          {Object.keys(databaseObj).length === 0 ? (
            <button className="btn btn-lg custom-button" role="button">
              Login
            </button>
          ) : (
            <button
              className="btn btn-lg custom-button"
              role="button"
              onClick={handleClick}
            >
              Log out of website
            </button>
          )}
        </span>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/therapists" exact component={Therapists} />
          <Route path="/therapists/:id" exact component={Therapist} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/users/:id/create" exact component={EditUserType} />
          <Route path="/users/:id/edit-issues" exact component={EditIssues} />
          <Route path="/therapists/:id/review" exact component={CreateReview} />
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
};

export default App;
