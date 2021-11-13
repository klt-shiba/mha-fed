import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TextInputField, Pane, Button, Card, Heading, Text, majorScale, Checkbox } from "evergreen-ui";
import CheckboxChip from "./CheckBoxChip";


// Edit Profile component
const EditIssues = ({ nextStep, prevStep }) => {
  // Set and Get profile form values
  const [short_summary, setShortSummary] = useState("");
  const [issues, setIssues] = useState([]);
  const [therapistIssues, setTherapistIssues] = useState([]);
  const { id } = useParams()
  const [checked, setChecked] = useState(true)



  const issuesObj = {
    therapist: {
      issues: therapistIssues
    }
  }

  const fetchIssues = () => {
    fetch("http://127.0.0.1:3001/api/v1/issues")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((r) => {
        console.log(r);
        setIssues(r);
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

  const handleClick = (e) => {
    e.preventDefault();
  };

  const toggleNewIssueField = () => { };

  const handleChange = (e) => {
    const rawValue = e.target.value
    const idValue = rawValue.split("_")
    console.log(idValue[0]);
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
    console.log(therapistIssues)
  }

  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  // };


  const renderIssuesCheckboxes = () => {
    console.log(issues);
    // console.log(issuesObject);

    if (issues.length === 0) {
      return <div>Write a review</div>;
    } else {
      console.log(issues);

      return (
        <Pane
          display="block"
          alignItems="center"
          justifyContent="center"
          textAlign="left"
          marginY={majorScale(3)}
        >
          {issues.map((issue) => {
            console.log(issue);
            return (
              <Checkbox
                id={`issue_${issue.name}`}
                key={`${issue.id}`}
                value={`${issue.id}_${issue.name}`}
                label={issue.name}
              />

            );
          })
          }
        </Pane >
      );
    }
  };

  const postIssues = (e) => {
    e.preventDefault()
    const url = `http://127.0.0.1:3000/api/v1/therapists/${id}/add-issues`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(issuesObj)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        // localStorage.setItem('token', data.jwt)
        // dispatch(setUser(data.user))
      })
      .catch(error => {
        console.log(error)
        console.log(JSON.stringify(issuesObj))
        return false
      })
  }

  return (
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
          <Pane>
            <Heading
              size={900}
              is="h1"
              textAlign="center"
              marginY={majorScale(1)}>What do you specialise in?</Heading>
            <Text
              size={600}
              textAlign="center">
              ToDo:
            </Text>
          </Pane>
          <Pane
            display="block"
            alignItems="center"
            justifyContent="center"
            textAlign="left"
            marginY={majorScale(3)}
          >
            <form>
              <div className="form-group" onChange={handleChange}>
                {renderIssuesCheckboxes()}
                <Checkbox label="checked"></Checkbox>
                <CheckboxChip></CheckboxChip>
              </div>
              <Button onClick={postIssues} name="new_issue_button">
                New issue +
              </Button>
              <Button appearance="primary" onClick={previous}>Continue</Button>
            </form>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default EditIssues;
