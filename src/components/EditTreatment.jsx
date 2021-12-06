import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Pane, Button, Heading, Text, majorScale } from "evergreen-ui";
import CheckboxChip from "./CheckBoxChip";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from './PageTitle'

// Edit Profile component
const EditTreatment = ({ nextStep, prevStep }) => {
    const databaseObj = useSelector(state => state.therapistReducer.isTherapist)
    // Set and Get profile form values
    const [treatments, setTreatments] = useState([]);
    const [therapistTreatments, setTherapistTreatments] = useState([]);
    const { user, setUser } = useContext(UserContext)

    const treatmentsObj = {
        therapist: {
            treatments: therapistTreatments
        }
    }

    const fetchTreatments = () => {
        fetch("http://127.0.0.1:3001/api/v1/treatments")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((r) => {
                console.log(r);
                setTreatments(r);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const previous = (e) => {
        e.preventDefault()
        prevStep()
    }

    const next = (e) => {
        e.preventDefault()
        nextStep()
    }

    useEffect(() => {
        fetchTreatments();
    }, []);

    const handleChange = (e) => {
        const rawValue = e.target.value
        const idValue = rawValue.split("_")
        console.log(idValue[0]);
        updateTherapistIssueArray(idValue[0])
    };
    const updateTherapistIssueArray = (value) => {

        if (therapistTreatments.includes(value)) {
            const pos = therapistTreatments.indexOf(value)
            if (pos >= 0) {
                therapistTreatments.splice(pos, 1)
            } else {
                console.log("Borked")
            }
        } else {
            therapistTreatments.push(value)
        }
        console.log(therapistTreatments)
    }

    const renderTreatmentsCheckboxes = () => {

        if (treatments.length === 0) {
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
                            {treatments.map((issue) => {
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

    const postTreatments = (e) => {
        e.preventDefault()

        if (!user) {
            return false
        } else {
            console.log(databaseObj)
            let id = databaseObj.data.id
            const url = `http://127.0.0.1:3001/api/v1/therapists/${id}/add-treatments`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(treatmentsObj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    nextStep()
                    // nextStep()
                })
                .catch(error => {
                    console.log(error)
                    console.log(JSON.stringify(treatmentsObj))
                    return false
                })
        }
    }

    return (
        <>
            <PageTitle
                isSmall
                title="Approaches I take"
                summary="Check all the boxes that apply"
                src="https://images.unsplash.com/photo-1559740451-b895701fa4b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
            />
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
                            <form onSubmit={e => postTreatments(e)}>
                                <div className="form-group" onChange={handleChange}>
                                    {renderTreatmentsCheckboxes()}
                                    <CheckboxChip></CheckboxChip>
                                </div>
                                <Pane display="flex">
                                    <Pane flex={1} alignItems="center" display="flex">

                                    </Pane>
                                    <Pane>
                                        <Button onClick={previous} name="back_button" marginRight={16} size="large">
                                            Back
                                        </Button>
                                        <Button appearance="primary" type="submit" size="large">Complete</Button>
                                    </Pane>
                                </Pane>
                            </form>
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        </>
    );
};

export default EditTreatment;
