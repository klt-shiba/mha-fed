import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Textarea, Pane, Button, Label, Heading, Text, majorScale } from "evergreen-ui";
import { UserContext } from "../UserContext";
import PageTitle from "./PageTitle";
import { Container } from "reactstrap";
import Section from "./Section";

const CreateReview = () => {

  const { user, setUser } = useContext(UserContext)
  const [rating, setRating] = useState(" ");
  const [therapist, setTherapist] = useState(null)
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const history = useHistory();
  const [userAttributes, setUserAttributes] = useState(null)


  useEffect(() => {
    redirectUserIfTherapist()
  }, [user])

  const checkUserType = () => {
    if (!user) {
      setUserAttributes(null)
      return false
    } else if (user.attributes.client === null) {
      setUserAttributes(user.attributes.therapist)
    } else if (user.attributes.therapist === null) {
      setUserAttributes(user.attributes.client)
    } else {
      setUserAttributes(null)
      return false
    }
  }

  const redirectUserIfTherapist = () => {
    if (!user) {
      return false
    } else if (user.attributes.therapist) {
      history.push('/therapists')
    } else {
      return false
    }
  }

  const fetchTherapist = () => {
    const url = `https://damp-journey-90616.herokuapp.com/api/v1/therapists/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTherapist(data)
      })
      .catch(error => console.log(error))
  }

  const clientId = () => {
    return (
      userAttributes ? userAttributes.id : false
    )
  }

  useEffect(() => {
    fetchTherapist()
  }, [])

  useEffect(() => {
    checkUserType()
    clientId()
  }, [user, userAttributes])

  const createReview = () => {
    const url = `https://damp-journey-90616.herokuapp.com/api/v1/therapists/${id}/add-review`;
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
        client_id: clientId()
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push(`/therapists/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview();
  };

  const renderTherapistInformationInPageTitle = () => {
    if (!therapist) {
      return false
    } else {
      return (`How was your experience with ${therapist.data.attributes.first_name}?`
      )
    }
  }

  return (
    <>
      <PageTitle
        isSmall
        title="Write a review"
        summary="Let others know how you went"
      />
      <Section
        backgroundColour="#fafafa"
        hasPaddingTop
        hasPaddingBottom>
        <Container fluid="xl">
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="left">
            <Pane
              width="100%"
              maxWidth='720px'
              display="block"
              textAlign="center">

              {token ? (
                false
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
                        fontSize="24px"
                        marginBottom={8}
                        textAlign="center"
                        marginY={majorScale(2)}>{renderTherapistInformationInPageTitle()}</Heading>
                      <Rating
                        label="How would you rate your Therapist?"
                        id="therapist_rating_input"
                        defaultValue={2}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        size="large"
                        fontSize="24px" />
                    </Pane>
                    <Pane
                      marginY={majorScale(2)}>
                      <Label htmlFor="therapist_comment" marginBottom={8} fontSize="17px" display="block">
                        Add a comment
                      </Label>
                      <Textarea
                        className="form-control"
                        id="therapist_comment"
                        label="Add a comment"
                        rows="6"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                    </Pane>
                    <Pane display="flex">
                      <Pane flex={1} alignItems="center" display="flex">
                      </Pane>
                      <Pane>
                        <Button
                          type="submit"
                          appearance="primary"
                          height={48}
                          fontSize="17px"
                          size="large" >
                          Post review
                        </Button>
                      </Pane>
                    </Pane>
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
        </Container>
      </Section >
    </>
  );
};

export default CreateReview;
