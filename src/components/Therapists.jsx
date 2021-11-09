import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";

const Therapists = () => {
    
  const [therapists, setTherapists] = useState([]);
  const history = useHistory();

  const fetchTherapists = () => {
    const url = "http://127.0.0.1:3001/api/v1/therapists";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setTherapists(response.data))
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  console.log("-------------");
  console.log(therapists);

  const allTherapists = therapists.map((therapist, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={therapist.attributes.avatar_url}
          className="card-img-top"
          alt={`${therapist.attributes.first_name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">
            {therapist.attributes.first_name} {therapist.attributes.last_name}
          </h5>
          <Link
            to={`/therapists/${therapist.id}`}
            className="btn custom-button"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  ));

  const noTherapists = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        {/* No recipes yet. Why not <Link to="/new_recipe">create one</Link> */}
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Find a Therapist</h1>
          <p className="lead text-muted">
            Take that first step and book with these professional therapists who
            are available now.
          </p>
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
        <div className="form-group">
          <input 
            type="search" 
            className="form-control"
            placeholder="Search for a therapist"></input>
          </div>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            {/* <Link to="/therapists" className="btn custom-button">
                                Create New Recipe
                            </Link> */}
          </div>
          <div className="row">
            {therapists.length > 0 ? allTherapists : noTherapists}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
};

export default Therapists;
