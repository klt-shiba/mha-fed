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
import LinearProgress from '@mui/material/LinearProgress';
import Footer from './Footer'
import { url } from "../environment"
import CardContainer from "./CardContainer";
import CardV2 from "./CardV2";

const Therapist = () => {

  const { user, setUser } = useContext(UserContext)
  const [therapistObj, setTherapistObj] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [issues, setIssues] = useState([]);
  const [treatments, setTreatments] = useState([])
  const { id } = useParams();
  const history = useHistory();
  const [therapistRating, setTherapistRating] = useState(null)
  const [isLoading, setIsLoading] = useState((true))
  const [relatedTherapists, setRelatedTherapists] = useState()
  let city = therapist?.city;

  const fetchTherapist = () => {

    fetch(`${url}therapists/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        const data = response.data
        setTherapistObj(data)
        setTherapist(data.attributes);
        setReviews(data.attributes.reviews)
        setIssues(data.attributes.issues)
        setTreatments(data.attributes.treatments)
        getRatings(data.attributes)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };


  const fetchRelatedTherapists = async (key, q) => {
    const response = await fetch(`${url}therapists/search/${key}/${q}`)
    if (!response.ok) {
      console.log(response)
      return false
    }
    const data = await response.json()
    console.log(data)
    handleRelatedTherapistsArray(data.data)
  }

  const handleRelatedTherapistsArray = (array) => {
    if (!array) {
      return undefined
    } else {
      let pos = array.find(el => el.id === therapistObj.id)
      setRelatedTherapists(array.splice(pos, 1))
    }
  }

  const getRatings = (object) => {

    const ratingArray = object.reviews

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

  useEffect(() => {
    console.log(therapist)
    fetchRelatedTherapists("City", `${city}`)
  }, [therapist])

  useEffect(() => {
    renderSameCityTherapists()
  }, [relatedTherapists]);


  const renderSameCityTherapists = () => {
    console.log("running")
    if (!relatedTherapists) {
      return null
    } else {
      console.log(relatedTherapists)
      return (
        <Infoblock
          heading={`Therapists from ${city}`}
          content={
            <CardContainer isCard>
              {relatedTherapists.map((el, index) => (
                <CardV2
                  key={index}
                  imgSrc={el.attributes.avatar_img_url}
                  hasLocation={el.attributes.city}
                  title={`${el.attributes.first_name}` + ` ${el.attributes.last_name}`}
                  href={`/therapists/${el.attributes.slug}`}
                  id={el.id}
                  isLoading={false} />
              ))}

            </CardContainer>}
        />
      )
    }
  }

  const ShowReviews = () => {

    if (reviews.length === 0) {
      return <div>Write a review</div>;
    } else {
      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

      return (
        <div>
          {reviews.map((review) => {

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
      return (
        <Button
          appearance="primary"
          width="100%"
          size="large"
          onClick={handleClick}
          height={48}
          fontSize="16px"
        >
          🤩 Review Therapist
        </Button>
      )
    } else if (user?.attributes?.client || user) {
      return (
        <>
          {
            user?.attributes?.client
              ? <Button
                appearance="primary"
                width="100%"
                height={48}
                size="large"
                fontSize="17px"
                onClick={handleClick}
              >
                🤩 Review Therapist
              </Button>
              : false
          }
        </>
      )
    } else if (Object.keys(user).length === 0) {
      return (
        <>

          <Button
            appearance="primary"
            width="full"
            height={48}
            size="large"
            fontSize="17px"
            onClick={handleClick}
          >
            Review Therapist
          </Button>

        </>
      )
    }
  }

  return (
    <>
      {isLoading && <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} />}
      <Section
        backgroundColour="#fafafa">
        <PrimaryBanner
          hasIcon
          hasBackgroundColour="#fafafa"
          hasLocation={therapist ? therapist.city : false}
          hasImg={therapist ? therapist.avatar_img_url : false}
          heading={therapist ? `${therapist.first_name} ` + ` ${therapist.last_name} ` : false}
          subHeading={renderSubheading(therapist)}
          hasRating={true}
          isRating={therapistRating} />
      </Section>
      <Section
        backgroundColour="#fff"
        hasPaddingBottom
        hasPaddingTop>
        <Container>
          <Pane
            display="flex"
            flexDirection="column"
            className="vbox">
            <Pane marginY={majorScale(3)}>
              <Row>
                <Col xs="12" lg="8">
                  <Pane>
                    <Infoblock
                      heading="About me"
                      content={therapist && therapist.long_summary} />
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
          </Pane >
        </Container>
      </Section>
      <Section
        backgroundColour="#fafafa"
        hasPaddingTop
        hasPaddingBottom>
        <Container>
          {renderSameCityTherapists()}
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default Therapist;
