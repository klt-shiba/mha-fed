import { formLabelClasses } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryBanner from "./PrimaryBanner";
import PageTitle from "./PageTitle";
import { SearchInput } from "evergreen-ui";
import HomeSearch from "./HomeSearch";

const Home = () => {


  const imgURL = "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"


  const renderSearch = () => {
    return (
      <SearchInput
        width={100}></SearchInput>
    )
  }
  return (
    <>
      <PageTitle
        src={imgURL}
        title="Real reviews that help you choose"
        summary="Over 50,000 reviews of Therapists, Counsellors and Social workers"
        searchBar={HomeSearch()}
      />
      <PrimaryBanner hasDirection={false} />
      <PrimaryBanner hasDirection hasButton />
    </>

  );
};

export default Home;
