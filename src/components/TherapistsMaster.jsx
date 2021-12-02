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
import HomeSearchV2 from './HomeSearchV2'

const Therapists = props => {

  const [therapists, setTherapists] = useState([]);
  const [filteredTherapist, setFilteredTherapist] = useState([]);
  const [issues, setIssues] = useState(null)
  const [dropdownIssues, setDropdownIssues] = useState(null)
  const [dropdownValue, setDropdownValues] = useState([])
  const history = useHistory();
  const location = useLocation();
  const [homepageSearch, setHomepageSearch] = useState(null)
  const searchResulstString = location.search ? location.search : ""


  useEffect(() => {
    checkIfSearchResultExists()
  }, [homepageSearch]);

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state) // result: 'some_value'
    setHomepageSearch(location.state);

  });

  useEffect(() => {
    prepareIssues()
  }, [issues]);


  const checkSearchParameter = (searchParameter) => {
    if (!searchParameter) {
      console.log("Search parameter doesn't exist")
    }
  }

  const checkIfSearchResultExists = () => {
    if (!homepageSearch) {
      console.log("Fetch run")
      setHomepageSearch(null)
      fetchTherapists();
    } else {
      console.log("Searhed run")
      console.log(homepageSearch)
    }
    console.log(therapists)
  }

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
        setTherapists(response.data);
      })
      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  const fetchIssues = async () => {
    try {
      const url = "http://127.0.0.1:3001/api/v1/issues"
      const res = await fetch(url);
      const data = await res.json();
      setIssues(data)
    } catch (error) {
      console.log(`errors: ${error}`)
    }
  }

  const prepareIssues = () => {
    if (!issues) {
      return false
    } else {
      const results = collectIssueNames(issues)
      setDropdownIssues(results)
    }
  }

  const collectIssueNames = (issues) => {
    let results = []
    issues.map((issue, index) => {
      let item = {
        "label": issue.name,
        "id": index + 1
      }
      results.push(item)
    })
    results.sort((a, b) => a.label.localeCompare(b.label))
    return results
  }

  const handleChange = (e) => {
    setDropdownValues(e.target.text)
  }
  const handleInputChange = (e) => {
  }

  const renderSearch = () => {
    return (
      <Autocomplete
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          border: 0,
          '& .Mui-Focused': {
            borderColor: "white",
            border: 0,
          },
        }}
        multiple
        limitTags={4}
        id="autocomplete"
        options={dropdownIssues ? dropdownIssues : "Not working"}
        getOptionLabel={(issue) => issue.label}
        onInputChange={handleInputChange}
        onChange={(event, newValue) => {
          setDropdownValues(newValue)
        }}
        value={dropdownValue}
        renderInput={(params) => (
          <TextField
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              border: 0,

              '& .Mui-Focused .MuiOutlinedInput-notchedOutline': {
                borderColor: "white",
                border: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                bgcolor: 'none',
                border: 0,
              },
            }}{...params} inputValue={"value"} onChange={handleChange} placeholder="I need help with..." />
        )}
      />
    )
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
    } else {
      return false
    }
    setFilteredTherapist(results)
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
    if (dropdownValue.length >= 1) {
      return (
        <CardContainer isCard>
          {
            filteredTherapist.map((therapist, index) => (
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
    } else if ((dropdownValue.length >= 1) && (filteredTherapist.length === 0)) {
      return (noTherapists)
    } else if (!dropdownValue) {
      return false
    } else if (homepageSearch) {
      return (
        <CardContainer isCard>
          {
            homepageSearch.data.map((therapist, index) => (
              <CardV2
                imgSrc={therapist.attributes.avatar_img_url}
                title={`${therapist.attributes.first_name}` + ` ${therapist.attributes.last_name}`}
                href={`/therapists/${therapist.id}`}
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
                imgSrc={therapist.attributes.avatar_img_url}
                title={`${therapist.attributes.first_name}` + ` ${therapist.attributes.last_name}`}
                href={`/therapists/${therapist.id}`}
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
    return (
      <Rating name="read-only" value={value} readOnly size="large" />
    )
  }
  const noTherapists = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Loading
      </h4>
    </div>
  );

  const renderSubheading = (object) => {
    const specialization = object ? object.attributes.specialization : null
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
    location.state = ""
    setHomepageSearch(null)
  }


  return (
    <>
      <PageTitle
        isSmall
        title="Real reviews"
        summary="Take that first step and book with these professional therapists who
        are available now."
        src="https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80"
        searchBar={HomeSearchV2(issues)} />
      <Container fluid="xl">
        <Section>
          <ResultsBar
            searchResult={homepageSearch ? searchResulstString.slice(3) : "Everything"}
            numberOfResults={homepageSearch ? homepageSearch.data.length : "18"}
            totalTherapists={therapists ? therapists.length : "18"}
            hasClick={clearResults}></ResultsBar>
          {therapists.length > 0 ? allTherapists() : noTherapists}
        </Section>
      </Container>
    </>
  );
};

export default Therapists;
