import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeNames } from "../reducers/tempUserActions";
import { createTherapist } from "../reducers/therapistActions";
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { Textarea, Pane, Button, Label, Heading, Text, majorScale } from "evergreen-ui";

const CreateReview = () => {

  const [rating, setRating] = useState(" ");
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const databaseObj = useSelector((state) => state.userReducer.user);
  const { id } = useParams();

  const history = useHistory();

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

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
    <Pane
      display="flex"
      flexDirection="column"
      className="vbox">
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginY={majorScale(4)}>

        <Pane
          max-width="480px"
          display="block"
          textAlign="center">

          {token ? (
            <Pane>
              <Heading
                size={900}
                is="h1"
                textAlign="center"
                marginY={majorScale(1)}>Write a review</Heading>
              <Text
                size={600}
                textAlign="center">
                Add a review so others know whether "name" is right for them.
              </Text>
            </Pane>

          ) : (
            <Pane>
              <Heading
                size={900}
                is="h1"
                textAlign="center"
                marginY={majorScale(1)}>Hey! I dont know you!</Heading>
              <Text
                size={600}
                textAlign="center">
                Login to write a review
              </Text>
            </Pane>
          )}
          <Pane
            display="block"
            alignItems="center"
            justifyContent="center"
            textAlign="left"
            marginY={majorScale(3)}
          >
            {token ? (
              <form onSubmit={handleSubmit}>
                <Pane
                  textAlign="center"
                  marginY={majorScale(2)}
                >
                  <Heading
                    size={600}
                    is="h2"
                    textAlign="center"
                    marginY={majorScale(1)}>How would you rate your therapist?</Heading>
                  <StyledRating
                    label="How would you rate your Therapist?"
                    name="customized-color"
                    id="therapist_rating_input"
                    defaultValue={2}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    size="large" />
                </Pane>
                <Pane
                  marginY={majorScale(2)}>
                  <Label htmlFor="therapist_comment" marginBottom={4} display="block">
                    Add a comment
                  </Label>
                  <Textarea
                    className="form-control"
                    id="therapist_comment"
                    label="Add a comment"
                    rows="3"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                </Pane>
                <Button type="submit" className="btn btn-primary">
                  Add Review
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <button type="login" className="btn btn-primary" link="/login">
                  Login
                </button>
              </div>
            )}
          </Pane>
        </Pane>
      </Pane>
    </Pane >
  );
};

export default CreateReview;
