import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeNames } from "../reducers/tempUserActions";
import { createTherapist } from "../reducers/therapistActions";

const CreateReview = () => {
  const [rating, setRating] = useState(" ");
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const databaseObj = useSelector((state) => state.userReducer.user);
  const { id } = useParams();

  const history = useHistory();

  console.log(databaseObj);

  const createReview = () => {
    const url = `http://127.0.0.1:3000/api/v1/therapists/${id}/review`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: rating,
        comment: comment,
        therapist_id: parseInt(id),
        client_id: 2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview();
    history.push(`/therapists/${id}`);
  };

  return (
    <div>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          {token ? (
            <div>
              <h1 className="display-4">Write a review</h1>{" "}
              <p className="lead text-muted">
                Add a review so others know whether "name" is right for them.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="display-4">Hey! I dont know you!</h1>{" "}
              <p className="lead text-muted">Login to write a review</p>
            </div>
          )}
        </div>
      </section>
      <section className="jumbotron jumbotron-fluid ">
        <div className="container py-8">
          {token ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="therapist_rating">
                  How would you rate your Therapist?
                </label>
                <select
                  className="form-control"
                  id="therapist_rating"
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="therapist_comment">Add a comment</label>
                <textarea
                  className="form-control"
                  id="therapist_comment"
                  rows="3"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Review
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button type="login" className="btn btn-primary" link="/login">
                Login
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CreateReview;
