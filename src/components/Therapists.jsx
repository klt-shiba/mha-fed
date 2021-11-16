import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUserUp } from "../reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput, Pane, Button, Card, Heading, Text, majorScale } from "evergreen-ui";
import { Rating } from "@mui/material";

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
      .then((response) => {
        console.log(response.data);
        setTherapists(response.data);
      })
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


  const getRatings = (object) => {

    const ratingArray = object.attributes.reviews

    if (ratingArray.length >= 1) {

      // Calculate Averate
      const results = ratingArray.map(ratingObject => {
        const ratings = []
        ratings.push(ratingObject.rating)
        return ratings
      })
      average(results)
    } else {
      return 0
    }
  }

  const average = (ratingsAverage) => ratingsAverage.reduce((a, b) => a + b) / ratingsAverage.length;


  const allTherapists = therapists.map((therapist, index) => (

    <Link
      to={`/therapists/${therapist.id}`}
    >
      <Card
        display="flex"
        flexDirection="column"
        className="vbox"
        key={index}
        minWidth={250}
        flex={1}
        name={therapist.attributes.first_name}
        description="Regular user"
        elevation={0}
        alignContent="space-between"
        margin="0.3rem"
        flex={1} elevation={1} padding="0.5rem"
      >
        <img
          src={therapist.attributes.avatar_url}
          className="card-img-top"
          alt={`${therapist.attributes.first_name} image`}
        />
        <Heading
          is="h2"
          size={700}>
          {therapist.attributes.first_name} {therapist.attributes.last_name}</Heading>

        <Text size={400}>{therapist.attributes.short_summary}</Text>
        <Rating name="read-only" value={getRatings(therapist)} readOnly />
      </Card >
    </Link>
  ));

  const noTherapists = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        {/* No recipes yet. Why not <Link to="/new_recipe">create one</Link> */}
      </h4>
    </div>
  );

  return (
    <><Pane
      display="flex"
      flexDirection="column"
      className="vbox">
      <Pane
        display="block"
        text-align="center"
        alignItems="center"
        textAlign="center"
        marginY={majorScale(4)}>
        <Heading
          size={900}
          is="h1"
          textAlign="center"
          marginY={majorScale(1)}>Find a Therapist</Heading>
        <Text
          size={600}
          textAlign="center">
          Take that first step and book with these professional therapists who
          are available now.
        </Text>
      </Pane>
      <Pane
        display="block"
        text-align="center"
        alignItems="center"
      >
        <SearchInput
          placeholder="Filter traits..."
          width="100%"
          height={48}
        />
      </Pane>
      <Pane
        text-align="center"
        alignItems="center"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        className="hbox"
        flex={1}
      >

        {therapists.length > 0 ? allTherapists : noTherapists}

        <Link to="/" className="btn btn-link">
          Home
        </Link>
      </Pane>
    </Pane>
    </>
  );
};

export default Therapists;
