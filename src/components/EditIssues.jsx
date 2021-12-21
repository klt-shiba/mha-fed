import React, { useState, useEffect, useContext } from "react";
import { Pane, Button, majorScale } from "evergreen-ui";
import CheckboxChip from "./CheckBoxChip";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from 'react-redux'
import { postIssues } from '../reducers/therapistActions'
import PageTitle from './PageTitle'
import LinearProgress from '@mui/material/LinearProgress';


// Edit Profile component
const EditIssues = ({ nextStep, prevStep }) => {
  // Set and Get profile form values
  const [issues, setIssues] = useState([]);
  const { user, setUser } = useContext(UserContext)
  const [therapistIssues, setTherapistIssues] = useState([]);
  const therapistStore = useSelector(state => state.therapistReducer)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)


  const issuesObj = {
    therapist: {
      issues: therapistIssues
    }
  }

  const fetchIssues = () => {
    fetch("https://damp-journey-90616.herokuapp.com/api/v1/issues")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((r) => {
        setIssues(r.sort());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const previous = (e) => {
    e.preventDefault()
    prevStep()
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    let id = therapistStore.id
    dispatch(postIssues(issuesObj, id))
  };

  const handleChange = (e) => {
    const rawValue = e.target.value
    const idValue = rawValue.split("_")
    updateTherapistIssueArray(idValue[0])
  };

  const updateTherapistIssueArray = (value) => {

    if (therapistIssues.includes(value)) {
      const pos = therapistIssues.indexOf(value)
      if (pos >= 0) {
        therapistIssues.splice(pos, 1)
      } else {
        console.log("Borked")
      }
    } else {
      therapistIssues.push(value)
    }
  }

  const renderIssuesCheckboxes = () => {

    if (issues.length === 0) {
      return <div>Write a review</div>;
    } else {
      return (
        <Pane
          display="block"
          alignItems="center"
          justifyContent="center"
          textAlign="left"
          marginY={majorScale(3)}

        >
          <div style={{ columnCount: "2", columnWidth: "auto" }}>
            <FormGroup>

              {issues.map((issue) => {
                return (
                  <FormControlLabel control={
                    <Checkbox
                      id={`issue_${issue.name}`}
                      key={`${issue.id}`}
                      value={`${issue.id}_${issue.name}`}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }}
                    />}
                    label={issue.name}
                  />

                );
              })
              }
            </FormGroup>
          </div>
        </Pane >
      );
    }
  };

  useEffect(() => {
    redirectWhenUserReturned()
  }, [therapistStore]);


  const redirectWhenUserReturned = () => {

    if (!user && !therapistStore) {
      return false
    } else {
      if (therapistStore.hasIssues) {
        setIsLoading(false)
        nextStep()
      } else {
        setIsLoading(false)
        return false
      }
    }
  }

  return (
    <>
      <PageTitle
        isSmall
        title="I can help with?"
        summary="Check all the boxes that apply"
        hasBackgroundColour="#bba4dc"
      />
      {isLoading ? <LinearProgress sx={{ height: '8px', bgcolor: 'white', color: 'purple' }} /> : false}
      <Pane
        display="flex"
        flexDirection="column"
        className="vbox">
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginY={majorScale(4)}>

          <Pane
            max-width="480px"
            display="block"
            textAlign="center">

            <Pane
              display="block"
              alignItems="center"
              justifyContent="center"
              textAlign="left"
              marginY={majorScale(3)}
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group" onChange={handleChange}>
                  {renderIssuesCheckboxes()}
                  <CheckboxChip></CheckboxChip>
                </div>
                <Pane display="flex">
                  <Pane flex={1} alignItems="center" display="flex">
                  </Pane>
                  <Pane>
                    <Button onClick={previous} name="back_button" marginRight={16} size="large">
                      Back
                    </Button>
                    <Button appearance="primary" type="submit" size="large">Next</Button>
                  </Pane>
                </Pane>
              </form>
            </Pane>
          </Pane>
        </Pane >
      </Pane >
    </>
  );
};

export default EditIssues;
