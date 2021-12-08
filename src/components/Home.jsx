import { formLabelClasses } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryBanner from "./PrimaryBanner";
import PageTitle from "./PageTitle";
import { SearchInput } from "evergreen-ui";
import HomeSearchV2 from "./HomeSearchV2";
import {
  useState, useEffect
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ActionStrip from "./ActionStrip";

const Home = () => {

  const [issues, setIssues] = useState(null)
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();


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


  return (
    <>
      <PageTitle
        src={imgURL}
        title="Real reviews that help you choose"
        summary="Over 50,000 reviews of Psychologist, Counsellors and Social workers"
        searchBar={HomeSearchV2(issues)}
      />
      <ActionStrip
        hasHeading="Sign up today"
        hasSubHeading="Find the right therapist for you by searching hundreds of qualified and registered therapists Australia wide." />
      {console.log(user)}
      <PrimaryBanner
        hasDirection={false}
        hasBackgroundColour="black"
        heading="Find help for issues"
        subHeading="Find the right therapist for you by searching hundreds of qualified and registered therapists Australia wide."
        hasImg="https://images.unsplash.com/photo-1509909756405-be0199881695?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80" />
      <ActionStrip
        hasBackgroundColour="##E7E4F9"
        hasHeading="Sign up today"
        hasSubHeading="Find the right therapist for you by searching hundreds of qualified and registered therapists Australia wide."
        hasButton
        hasButtonLabel="Sign up today!" />
      <PrimaryBanner
        hasDirection
        hasBackgroundColour="black"
        hasImg="https://images.unsplash.com/photo-1624887009213-040347b804c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4387&q=80" />
    </>

  );
};

export default Home;
