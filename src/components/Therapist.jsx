import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Button, Card, Heading, Text, majorScale } from "evergreen-ui";


const Therapist = () => {
  const [therapist, setTherapist] = useState("");
  const [therapistUser, setTherapistUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const fetchTherapist = () => {
    const url = `http://127.0.0.1:3001/api/v1/therapists/${id}`;
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


  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTherapist();
  }, []);

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

            return (<div>
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

            return (<li>
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
    <Pane
      display="flex"
      flexDirection="column"
      className="vbox">
      <Pane
        width="100%">
        <img
          src={therapist.avatar_url}
          alt={`${therapist.first_name} image`}
          className="img-fluid position-absolute"
        />
      </Pane>
      <Pane>
        <Heading is="h1" size={900}>
          {therapist.first_name} {therapist.last_name}
        </Heading>
      </Pane>
      <Pane>
        <Heading is="h2" size={600}>
          What I can help with
        </Heading>
        <Pane>{ShowIssues()}</Pane>
      </Pane>
      <Pane>
        <Heading is="h2" size={600}>
          My reviews
        </Heading>
        <Pane>{ShowReviews()}</Pane>
        <Pane>
          <Button
            appearance="primary"
            onClick={handleClick}
          >
            Review Therapist
          </Button></Pane>
      </Pane>

      <Link to="/therapists" className="btn btn-link">
        Back to Therapists
      </Link>
    </Pane >
  );
};

export default Therapist;
