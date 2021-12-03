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

const Home = () => {

  const [issues, setIssues] = useState(null)


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
      <PrimaryBanner hasDirection={false} />
      <PrimaryBanner hasDirection hasButton />
    </>

  );
};

export default Home;
