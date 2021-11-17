import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import Chip from '@mui/material/Chip';
import { Pane, Button, Text, Heading, Paragraph, majorScale } from "evergreen-ui";
import { Rating } from "@mui/material";


const Therapist = () => {

  const [therapist, setTherapist] = useState("");
  const [therapistUser, setTherapistUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);
  const [treatments, setTreatments] = useState([])
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
        const data = response.data
        console.log(data)
        setTherapist(data.attributes);
        setTherapistUser(data);
        setReviews(data.attributes.reviews)
        setIssues(data.attributes.issues)
        setTreatments(data.attributes.treatments)
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

    if (reviews.length === 0) {
      return <div>Write a review</div>;
    } else {
      console.log(reviews);
      return (
        <div>
          {reviews.map((review) => {
            console.log(review);

            return (
              <Pane>
                <Rating name="read-only" value={review.rating} readOnly />
                <Paragraph>"{review.comment}"</Paragraph>
              </Pane>
            )
          })}
        </div>
      );
    }
  };

  const ShowIssues = () => {
    if (issues.length === 0) {
      return <div>?</div>;
    } else {
      return (
        <ul>
          {issues.map((issue) => {
            return (
              <Chip label={issue.name} color="info" size="small"></Chip>
            )
          })
          }
        </ul >
      );
    }
  };

  const ShowTreatments = () => {
    if (treatments.length === 0) {
      return <div>?</div>;
    } else {
      return (
        <ul>
          {treatments.map((treatment) => {
            return (
              <Chip label={treatment.name} color="success" size="small"></Chip>
            )
          })
          }
        </ul >
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
          About me
        </Heading>
        <Paragraph>
          {therapist.long_summary}
        </Paragraph>
      </Pane>
      <Pane>
        <Heading is="h2" size={600}>
          What I can help with
        </Heading>
        <Pane>{ShowIssues()}</Pane>
      </Pane>
      <Pane>
        <Heading is="h2" size={600}>
          Approaches I take
        </Heading>
        <Pane>{ShowTreatments()}</Pane>
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
