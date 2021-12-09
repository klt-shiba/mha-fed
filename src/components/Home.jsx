import React from "react";
import PrimaryBanner from "./PrimaryBanner";
import PageTitle from "./PageTitle";
import HomeSearchV2 from "./HomeSearchV2";
import {
  useState, useEffect
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ActionStrip from "./ActionStrip";
import Footer from "./Footer";
import Section from './Section'
import { useHistory } from "react-router";

const Home = () => {

  const [issues, setIssues] = useState(null)
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const history = useHistory()

  const imgURL = "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"

  const fetchIssues = () => {
    fetch("http://127.0.0.1:3001/api/v1/issues")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((r) => {
        setIssues(r.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }))
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    fetchIssues()
  }, [])

  const onClick = (e) => {
    e.preventDefault()
    const routeToCreateAccount = () => {
      history.push(`/register`)
    }
    routeToCreateAccount()
  }


  return (
    <>
      <PageTitle
        src={imgURL}
        hasBackgroundColour="#BCD3F2"
        title="Real reviews that help you choose"
        summary="Over 50,000 reviews of Psychologist, Counsellors and Social workers"
        searchBar={HomeSearchV2(issues)}
      />
      <ActionStrip
        hasBackgroundColour="##E7E4F9"
        hasHeading="Sign up today"
        hasSubHeading="Find the right therapist for you by searching hundreds of qualified and registered therapists Australia wide."
        hasOnClick={onClick}
        hasButton
        hasButtonLabel="Sign up today!" />
      <Section
        hasPaddingTop
        hasPaddingBottom
        backgroundColour="#BCD3F2">
        <PrimaryBanner
          hasDirection={false}
          hasBackgroundColour="#BCD3F2"
          heading="Find help for issues"
          subHeading="Find the right therapist for you by searching hundreds of qualified and registered therapists Australia wide."
          hasImg="https://images.unsplash.com/photo-1509909756405-be0199881695?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80" />
      </Section>
      <ActionStrip
        hasHeading="Honest experiences"
        hasSubHeading="Reviews are open to anyone. Select your therapist, share your experience and help others." />
      {console.log(user)}
      <Section
        hasPaddingTop
        hasPaddingBottom
        backgroundColour="#d8f3dc">
        <PrimaryBanner
          hasDirection
          heading="Feel confident"
          subHeading="We take care to verify each review ensuring it is written by a real person and tied to a genuine session."
          hasBackgroundColour="#d8f3dc"
          hasImg="https://images.unsplash.com/photo-1624887009213-040347b804c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4387&q=80"
        />
      </Section>
      <Footer />
    </>
  );
};

export default Home;
