import React, { useEffect, useState, useMemo } from "react";
import { autoLogin } from "../reducers/userActions";
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
import EditTreatment from "./EditTreatment";
import { UserContext } from "../UserContext";
import ProfilePage from "./ProfilePage";
import UpdateUserType from "./UpdateUserType";
import UpdateAccountInfo from "./UpdateAccountInfo";
import ErrorPage from "./ErrorPage";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {

  const dispatch = useDispatch();
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])
  const databaseObj = useSelector((state) => state.userReducer.user);
  const token = localStorage.getItem("token");


  useEffect(() => {
    fastLogin()
  }, [token])

  const fastLogin = () => {
    console.log("Clicked")
    if (!token) {
      localStorage.removeItem("token")
      setUser(null)
      return false
    } else {
      dispatch(autoLogin())
      setUser(databaseObj.data)
    }
  }

  return (
    <div style={{
      height: "100vh", backgroundColor: "#fafafa"
    }}>
      <Router>
        <UserContext.Provider value={providerValue}>
          <NavBar hasToken={fastLogin} />
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
            <Route path="/users/:id/profile" exact component={ProfilePage} />
            <Route path="/users/:id/update-profile" exact component={UpdateUserType} />
            <Route path="/users/:id/update-account" exact component={UpdateAccountInfo} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer></Footer>
        </UserContext.Provider>
      </Router>

    </div >
  );
};

export default App;
