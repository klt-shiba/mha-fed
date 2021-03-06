import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import CardV2 from "./CardV2"
import CardContainer from "./CardContainer";
import { Container } from 'reactstrap';
import PageTitle from "./PageTitle"
import Section from "./Section"
import { Autocomplete, TextField } from "@mui/material";
import ResultsBar from './ResultsBar'
import HomeFilterSearchBar from './HomeFilterSearchBar'
import LinearProgress from '@mui/material/LinearProgress';
import Footer from './Footer'
import { url } from "../environment"


const Therapists = props => {

  const history = useHistory();
  const location = useLocation();

  const [therapists, setTherapists] = useState([]);
  const [filteredTherapist, setFilteredTherapist] = useState([]);
  const [issues, setIssues] = useState(null)
  const [dropdownIssues, setDropdownIssues] = useState(null)
  const [dropdownValue, setDropdownValues] = useState([])
  const [homepageSearch, setHomepageSearch] = useState(null)
  const [searchKey, setSearchKey] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [isLoading, setIsLoading] = useState((true))
  const [isPopular, setIsPopular] = useState((false))

  useEffect(() => {
    checkIfSearchResultExists()
  }, [homepageSearch]);

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    // console.log(location.pathname); // result: '/secondpage'
    // console.log(location.search); // result: '?query=abc'
    // console.log(location.state) // result: 'some_value'
    if (!location.search) {
      clearResults()
    } else {
      trimSearchParameter(checkSearchParameter(location.search))
      setHomepageSearch(location.state);
      checkIfSearchResulstAndValueExist()
    }

  }, [homepageSearch, location.search]);

  const checkSearchParameter = (searchParameter) => {
    if (!searchParameter) {
      return false
    } else {
      return searchParameter
    }
  }

  const trimSearchParameter = (string) => {

    if (!string) {
      return false
    } else {

      let resultsArray = string.substring(1).split("=")
      let trimmedValue = resultsArray[1].split("%20").join(" ")

      if (resultsArray[0] === 'Issue') {
        let trimmedArray = resultsArray[1].split(",")
        setSearchValue(trimmedArray)
      } else {
        setSearchValue(trimmedValue)
      }
      setSearchKey(resultsArray[0].toLowerCase())
    }
  }

  const checkIfSearchResulstAndValueExist = () => {

    if (!searchKey && !searchValue) {
      return false
    } else if (Array.isArray(searchValue)) {
      filterTherapistsByKeyAndArray(searchKey, searchValue)
    } else {
      filterTherapistsByKeyAndValue(searchKey, searchValue)
    }
  }


  const filterTherapistsByKeyAndValue = (key, value) => {

    let results = []

    if (!homepageSearch) {
      return false
    } else {
      homepageSearch.data.some((el) => {
        let therapistAttributeObj = el.attributes
        if (therapistAttributeObj[key] === value) {
          results.push(el)
        } else {
          return false
        }
      })
      setFilteredTherapist(results)
    }
  }

  const filterTherapistsByKeyAndArray = (key, array) => {

    let results = []

    let searchedIssuesArray = array

    if (!homepageSearch) {
      return false

    } else {

      let therapistsArray = homepageSearch.data

      therapistsArray.map((therapist) => {

        //Array of Therapist Issues Objs
        let therapistIssuesArray = therapist.attributes.issues
        let therapistIssuesNameArray = []

        therapistIssuesArray.map((el) => {
          therapistIssuesNameArray.push(el.name)
        })

        // Array of issues
        if (searchedIssuesArray.every((issue) => therapistIssuesNameArray.includes(issue))) {
          results.push(therapist)
        } else {
          return false
        }
      })
      setFilteredTherapist(results)
    }
  }

  const checkIfSearchResultExists = () => {
    if (!homepageSearch) {
      setHomepageSearch(null)
      fetchTherapists();
    } else {
      console.log("Searhed run")
    }
  }

  const fetchTherapists = () => {
    fetch(`${url}therapists`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setTherapists(response.data);
        setIsLoading(false)
        return response
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  const fetchIssues = async () => {

    try {
      const newUrl = `${url}issues`
      const res = await fetch(newUrl);
      const data = await res.json();

      setIssues(data.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      }))

    } catch (error) {
      console.log(`errors: ${error}`)
    }
  }


  useEffect(() => {
    allTherapists();
    cleanUpIssues()
    filterTherapists()
  });

  const cleanUpIssues = () => {
    const results = []
    dropdownValue.map((el) => {
      results.push(el.label)
    })
    return results
  }

  // Filter Therapists by issues that they deal with.
  const filterTherapists = () => {
    const results = []
    const currentTherapists = [...therapists]

    // If dropdowns options have been selected
    if (dropdownValue.length > 0) {

      // Loop through each Therapists
      currentTherapists.map((el, index) => {

        // Store Therapists Issues array
        const currentTherapist = el
        let issues = el.attributes.issues

        // If Therapist has more than 0 issues
        if (issues.length > 0) {
          // Loop through issues and see if dropdown options exist in Therapists issues.
          issues.map((el) => {
            // Store each issue name
            let issueNames = el.name
            dropdownValue.map((el) => {
              if (el.label === issueNames) {
                results.push(currentTherapist)
                return true
              } else {
                return false
              }
            })
          })
        } else {
          return false
        }
      })
      setFilteredTherapist(results)
    } else {
      return false
    }

  }
  const getRatings = (object) => {
    const ratingArray = object.attributes.reviews
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
    if (filteredTherapist || dropdownValue.length >= 1) {
      return (
        <CardContainer isCard>
          {
            filteredTherapist.map((therapist, index) => (
              <CardV2
                key={index}
                isPopular={(getRatings(therapist) >= 5) ? true : false}
                imgSrc={therapist.attributes.avatar_img_url}
                hasLocation={therapist.attributes.city}
                title={`${therapist.attributes.first_name}` + ` ${therapist.attributes.last_name}`}
                href={`/therapists/${therapist.attributes.slug}`}
                id={therapist.id}
                body={renderSubheading(therapist)}
                rating={updateRatings(getRatings(therapist))}
                isLoading={false} />
            ))
          }
        </CardContainer >
      )
    } else {
      return (
        <CardContainer isCard>
          {
            therapists.map((therapist, index) => (
              <CardV2
                key={index}
                isPopular={(getRatings(therapist) >= 5) ? true : false}
                imgSrc={therapist.attributes.avatar_img_url}
                hasLocation={therapist.attributes.city}
                title={`${therapist.attributes.first_name}` + ` ${therapist.attributes.last_name}`}
                href={`/therapists/${therapist.attributes.slug}`}
                id={therapist.id}
                body={renderSubheading(therapist)}
                rating={updateRatings(getRatings(therapist))}
                isLoading={false} />
            ))
          }
        </CardContainer >
      )
    }
  }
  const updateRatings = (value) => {

    if (!value) {
      return false
    } else {

      if (value === 5) {

      }
      return (
        <Rating name="read-only" value={value} readOnly size="large" />
      )
    }
  }
  const noTherapists = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>

      </h4>
    </div>
  );


  const renderSubheading = (object) => {
    const specialization = object ? object.attributes.profession : null
    if (!object) {
      return false
    } else {
      return (
        `${specialization} specialising in ${stringifyIssuesForSubheading(object)}`
      );
    };
  }

  const stringifyIssuesForSubheading = (object) => {

    const smallIssuesArray = object ? object.attributes.issues : null
    const results = []

    if (!smallIssuesArray) {
      return false
    } else {
      for (let issue of smallIssuesArray) {
        results.push(issue.name)
      }
    }
    return results.slice(0, 3).join(', ')
  }

  const clearResults = () => {
    history.push({
      search: "",
      state: ""
    })
    setHomepageSearch(null)
    setSearchValue(null)
    setSearchKey(null)
    setFilteredTherapist(null)
  }

  const renderResultsBar = () => {
    return (
      <>
        <ResultsBar
          showingAllTherapists={!filteredTherapist ? true : false}
          isIssue={searchKey == "issue" ? true : false}
          searchResult={homepageSearch ? searchValue : "Everything"}
          numberOfResults={filteredTherapist ? filteredTherapist.length : therapists.length}
          totalTherapists={therapists ? therapists.length : "18"}
          hasClick={clearResults} />
      </>
    )
  }

  useEffect(() => {
    renderResultsBar()
  }, [filterTherapists])

  const renderFilterBar = () => {

    if (!therapists) {
      return (
        <HomeFilterSearchBar
          issuesArray={issues ? issues : false}
          therapistsArray={homepageSearch ? homepageSearch : therapists}
        />
      )
    } else {
      return (
        <HomeFilterSearchBar
          issuesArray={issues ? issues : false}
          therapistsArray={therapists ? therapists : homepageSearch}
        />
      )
    }

  }
  return (
    <>
      <PageTitle
        isSmall
        title="Real reviews"
        // hasBackgroundColour="#BCD3F2"
        summary="Take that first step and book with these professional who
        are available now."
        src="https://images.unsplash.com/photo-1566373477478-716624ecd9f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
        searchBar={renderFilterBar()} />
      {isLoading ? <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} /> : false}
      <Section
        hasPaddingTop
        hasPaddingBottom
        backgroundColour="#fff"
      >
        <Container fluid="xl">
          {renderResultsBar()}
          {therapists.length > 0 ? allTherapists() : noTherapists}
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default Therapists;
