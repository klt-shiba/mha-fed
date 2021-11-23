import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SearchInput, Combobox } from "evergreen-ui";
import { Rating } from "@mui/material";
import CardV2 from "./CardV2"
import CardContainer from "./CardContainer";
import { Container } from 'reactstrap';
import PageTitle from "./PageTitle"
import Section from "./Section"
import { Autocomplete, TextField, InputBase } from "@mui/material";




const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [issues, setIssues] = useState(null)
  const [dropdownIssues, setDropdownIssues] = useState(null)
  const [dropdownValue, setDropdownValues] = useState([])
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
    fetchIssues();
  }, []);

  useEffect(() => {
    prepareIssues()
  }, [issues]);

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
      console.log("Not working")
      return "Empty"
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
    console.log(e.target.id)
    setDropdownValues(e.target.text)
  }
  const handleInputChange = (e) => {
    // Value when you type into the input field
    console.log(e.target.value)
  }

  const renderSearch = () => {
    return (
      // <Combobox
      //   placeholder="I need help with..."
      //   width="100%"
      //   height={48}
      //   items={prepareIssues()}
      //   itemToString={item => (item ? item.label : '')}
      // />
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
        options={dropdownIssues ? dropdownIssues : ["Not working"]}
        getOptionLabel={(option) => option.label}
        onInputChange={handleInputChange}
        onChange={(event, newValue) => {
          setDropdownValues([newValue])
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
  });


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
      <PageTitle
        isSmall
        title="Find a Therapist"
        summary="Take that first step and book with these professional therapists who
        are available now."
        searchBar={renderSearch()} />
      <Container fluid="xl">
        {console.log(dropdownValue)}
        <Section>
          {therapists.length > 0 ? allTherapists() : noTherapists}
        </Section>
      </Container>
    </>
  );
};

export default Therapists;
