import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";

const Therapist = () => {
  const [therapist, setTherapist] = useState("");
  const [therapistUser, setTherapistUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchTherapist = () => {
    const url = `/api/v1/therapists/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response.data.attributes)
        setTherapist(response.data.attributes);
        setTherapistUser(response.data);
        setReviews(response.data.attributes.reviews)
        setIssues(response.data.attributes.issues)
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  // const fetchReviews = () => {
  //   const url = `/api/v1/therapists/${id}/reviews`;
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setReviews(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // history.push("/");
  //     });
  // };

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTherapist();
  }, []);

  // useEffect(() => {
  //   fetchReviews();
  // }, []);

  // const reviewsObject = Object.keys(reviews).length === 0;

  const ShowReviews = () => {
    console.log("working");
    console.log(reviews);

    if (reviews.length === 0) {
      return <div>Write a review</div>;
    } else {
      console.log(reviews);

      return (
        <div>
          {reviews.map((review) => {
            console.log(review);

            return( <div>
              <h6 className="mb-2">{review.rating} / 5</h6>
              <p>"{review.comment}"</p>
            </div>
            )
          })}
        </div>
      );
    }
  };

  const ShowIssues = () => {
    console.log("working");
    console.log(issues);

    if (issues.length === 0) {
      return <div>?</div>;
    } else {
      console.log(issues);

      return (
        <ul>
          {issues.map((issue) => {
            console.log(issue);

            return( <li>
              <h6 className="mb-2">{issue.name}</h6>
            </li>
            )
          })}
        </ul>
      );
    }
  };

  const handleClick = (e) => {
    console.log(e.target);
    history.push("");
    redirectUser(token);
  };

  const redirectUser = (loggedIn) => {
    if (loggedIn) {
      history.push(`therapists/${id}/review`);
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="">
      r
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={therapist.avatar_url}
          alt={`${therapist.first_name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {therapist.first_name} {therapist.last_name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">What I can help with</h5>
              {ShowIssues()}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">About me</h5>
            <p>{therapist.long_summary}</p>
            <h5 className="mb-2">My reviews</h5>
            <div>{ShowReviews()}</div>
          </div>
          <div className="col-sm-12 col-lg-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
            >
              Review Therapist
            </button>
          </div>
        </div>
        <Link to="/therapists" className="btn btn-link">
          Back to Therapists
        </Link>
      </div>
    </div>
  );
};

export default Therapist;
