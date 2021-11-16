import React, { useEffect, useState } from "react";
import { logUserOut, autoLogin } from "../reducers/userActions";
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
import GettingStarted from "../Container/GettingStarted"
import { Avatar } from "evergreen-ui";
import EditTreatment from "./EditTreatment";


const App = () => {
  const [user, setUser] = useState("")

  const renderAvatar = () => {
    return (
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
        name="Alan Turing"
        size={40}
      />
    )
  }

  const storeUser = async () => {
    if (hasToken) {

      console.log("True")
      console.log(databaseObj)
    } else {
      console.log("not-working")
    }
  }


  const databaseObj = useSelector((state) => state.userReducer.user);



  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logUserOut());
  };
  const hasToken = () => {
    dispatch(autoLogin())
    renderAvatar()
  }

  const RenderButton = () => {
    return (
      <div className="container">
        <span id="logout_signin">
          {!token ? (
            <button className="btn btn-lg custom-button">
              Login
            </button>
          ) : (
            <div>
              {hasToken()}
            </div>
          )}
        </span>
      </div>
    );
  };

  return (
    <div>
      {/* {RenderButton()} */}
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/therapists" exact component={Therapists} />
          <Route path="/therapists/:id" exact component={Therapist} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/users/:id/getting-started" exact component={GettingStarted} />
          <Route path="/users/:id/create" exact component={EditUserType} />
          <Route path="/therapists/:id/edit-issues" exact component={EditIssues} />
          <Route path="/therapists/:id/edit-treatment" exact component={EditTreatment} />
          <Route path="/therapists/:id/review" exact component={CreateReview} />
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
};

export default App;
