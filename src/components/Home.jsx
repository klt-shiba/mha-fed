import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Find a Therapist</h1>
          <p className="lead">
            Take that first step and book with these professional therapists who
            are available now.
          </p>
          <hr className="my-4" />
          <Link
            to="/therapists"
            className="btn btn-lg custom-button"
            role="button"
          >
            View Therapists
          </Link>
          <Link to="/login" className="btn btn-lg custom-button" role="button">
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-lg custom-button"
            role="button"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
