import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Pane, Button, Paragraph, majorScale } from "evergreen-ui";
import { Rating } from "@mui/material";
import Section from "./Section";
import { Container, Row, Col } from "reactstrap";
import ImgBanner from "./ImgBanner";
import Infoblock from "./InfoBlock"
import Bullet from "./Bullets";
import PrimaryBanner from "./PrimaryBanner";
import TherapistRatingCard from "./TherapistRatingsCard";
import { UserContext } from "../UserContext";

const Therapist = () => {

  const { user, setUser } = useContext(UserContext)
  const [therapist, setTherapist] = useState(null);
  const [therapistUser, setTherapistUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);
  const [treatments, setTreatments] = useState([])
  const { id } = useParams();
  const history = useHistory();
  const [therapistRating, setTherapistRating] = useState(null)

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
        getRatings(data.attributes)
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  const getRatings = (object) => {

    const ratingArray = object.reviews

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
      setTherapistRating(roundedResults)
    } else {
      return 0
    }
  }

  const average = (ratingsAverage) => ratingsAverage.reduce((a, b) => a + b) / ratingsAverage.length;


  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTherapist();
  }, []);

  const ShowReviews = () => {

    if (reviews.length === 0) {
      return <div>Write a review</div>;
    } else {
      console.log(reviews);

      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

      return (
        <div>
          {reviews.map((review) => {
            console.log(review);

            let dateString = review.created_at
            return (
              <TherapistRatingCard
                isRating={review.rating}
                hasComment={review.comment}
                hasDate={formatDate(dateString)}
                hasAuthor={"Anonymous"}>
              </TherapistRatingCard>
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
        <div>
          {issues.map((issue) => {
            return (
              <Bullet label={issue.name} hasColour="green" hasSize="small"></Bullet>
            )
          })
          }
        </div >
      );
    }
  };

  const ShowTreatments = () => {
    if (treatments.length === 0) {
      return <div>?</div>;
    } else {
      return (
        <div>
          {treatments.map((treatment) => {
            return (
              <Bullet label={treatment.name} hasColour="blue" hasSize="small"></Bullet>
            )
          })
          }
        </div >
      );
    }
  };

  useEffect(() => {
    renderImgBanner()
  }, [therapist, therapistRating])

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


  const renderImgBanner = () => {
    if (!therapist) {
      return false
    } else {
      return (
        <ImgBanner
          src={therapist.avatar_img_url}
          alt={`${therapist.first_name} image`}
          heading={`${therapist.first_name}` + ` ${therapist.last_name}`}
          rating={therapistRating} />
      )
    }
  }


  const renderSubheading = (object) => {
    const specialization = object ? object.profession : null
    if (!object) {
      return false
    } else {
      return (
        `${specialization} specialising in ${stringifyIssuesForSubheading(object)}`
      );
    };
  }

  const stringifyIssuesForSubheading = (object) => {
    const smallIssuesArray = object ? object.issues : null
    const results = []

    for (let issue of smallIssuesArray) {
      results.push(issue.name)
    }

    return results.slice(0, 3).join(', ')

  }


  const renderReviewButton = () => {
    if (!user) {
      return false
    } else {
      return (
        <>
          {
            user.attributes.client ?
              <Button
                appearance="primary"
                width="full"
                onClick={handleClick}
              >
                Review Therapist
              </Button>
              : false
          }
        </>
      )
    }
  }

  return (
    <>
      <Section
        backgroundColour="#fafafa">
        {console.log(user)}
        <PrimaryBanner
          hasLocation={therapist ? therapist.state : false}
          hasDirection={false}
          hasImg={therapist ? therapist.avatar_img_url : false}
          heading={therapist ? `${therapist.first_name} ` + ` ${therapist.last_name} ` : false}
          subHeading={renderSubheading(therapist)}
          hasRating={true}
          isRating={therapistRating} />
      </Section>
      <Container>
        <Pane
          display="flex"
          flexDirection="column"
          className="vbox">
          <Section>
            <Container>
              <Pane marginY={majorScale(3)}>
                <Row>
                  <Col xs="12" lg="8">
                    <Pane>
                      <Infoblock
                        heading="About me"
                        content={therapist ? therapist.long_summary : false} />
                    </Pane>
                    <Pane marginY={majorScale(3)}>
                      <Infoblock
                        heading="What I can help with"
                        content={ShowIssues()} />
                    </Pane>
                    <Pane marginY={majorScale(3)}>
                      <Infoblock
                        heading="Approaches I take"
                        content={ShowTreatments()} />
                    </Pane>
                  </Col>
                  <Col xs="12" lg="4">
                    <Pane>
                      <Infoblock
                        heading="My reviews"
                        content={ShowReviews()} />
                    </Pane>
                    <Pane>
                      {renderReviewButton()}
                    </Pane>
                  </Col>
                </Row>
              </Pane>
            </Container>
          </Section>
        </Pane >
      </Container>
    </>
  );
};

export default Therapist;
