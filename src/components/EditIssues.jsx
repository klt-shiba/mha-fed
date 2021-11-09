import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Edit Profile component
const EditIssues = () => {
  // Set and Get profile form values
  const [short_summary, setShortSummary] = useState("");
  const [issues, setIssues] = useState([]);
  const [therapistIssues, setTherapistIssues] = useState([]);
  const { id } = useParams()

  const issuesObj = {
    therapist: {
      issues: therapistIssues
    }
  }

  const fetchIssues = () => {
    fetch("http://127.0.0.1:3000/api/v1/issues")
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

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
  };

  const toggleNewIssueField = () => {};

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

  const renderIssuesCheckboxes = () => {
    console.log(issues);
    // console.log(issuesObject);

    if (issues.length === 0) {
      return <div>Write a review</div>;
    } else {
      console.log(issues);

      return (
        <div>
          {issues.map((issue) => {
            console.log(issue);

            return (
              <div className="form-check form-check-inline" key={`${issue.id}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="user-type"
                  id={`issue_${issue.name}`}
                  value={`${issue.id}_${issue.name}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`issue_${issue.name}`}
                >
                  {issue.name}
                </label>
              </div>
            );
          })}
        </div>
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
    <div className="">
      <form>
        <div className="form-group" onChange={handleChange}>
          <label htmlFor="therapist_last_name">Select all that apply</label>
          {renderIssuesCheckboxes()}
        </div>
        <button onClick={postIssues} name="new_issue_button">
          New issue +
        </button>
      </form>
    </div>
  );
};

export default EditIssues;
