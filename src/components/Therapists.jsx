import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { SearchInput, Pane, Button, Card, Heading, Text, majorScale } from "evergreen-ui";
import { Rating } from "@mui/material";
import CardV2 from "./CardV2"
import CardContainer from "./CardContainer";
import { Container } from 'reactstrap';


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


  useEffect(() => {
    allTherapists();
  });



  console.log("-------------");
  console.log(therapists);


  const getRatings = (object) => {

    const ratingArray = object.attributes.reviews

    console.log(ratingArray)

    if (!ratingArray) {
      return false
    }

    else if (ratingArray.length >= 1) {
      const ratings = []
      // Calculate Averate
      ratingArray.map(ratingObject => {
        ratings.push(ratingObject.rating)
      })
      const roundedResults = Math.ceil(average(ratings))
      return roundedResults
    } else {
      return 0
    }
  }

  const average = (ratingsAverage) => ratingsAverage.reduce((a, b) => a + b) / ratingsAverage.length;


  const allTherapists = () => {

    return (

      <CardContainer isCard>

        {
          therapists.map((therapist, index) => (
            <CardV2
              imgSrc={therapist.attributes.avatar_img_url}
              title={`${therapist.attributes.first_name}` + ` ${therapist.attributes.last_name}`}
              href={`/therapists/${therapist.id}`}
              id={therapist.id}
              body={therapist.attributes.short_summary}
              rating={updateRatings(getRatings(therapist))}
              isLoading={false} />
          ))
        }
      </CardContainer >
    )

  }


  const updateRatings = (value) => {

    return (
      <Rating name="read-only" value={value} readOnly size="large" />
    )
  }

  const noTherapists = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        {/* No recipes yet. Why not <Link to="/new_recipe">create one</Link> */}
      </h4>
    </div>
  );

  return (
    <>
      <Container fluid="xl">
        <Pane
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


          {therapists.length > 0 ? allTherapists() : noTherapists}


        </Pane>
      </Container>
    </>
  );
};

export default Therapists;
