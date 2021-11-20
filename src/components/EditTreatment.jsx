import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pane, Button, Heading, Text, majorScale } from "evergreen-ui";
import CheckboxChip from "./CheckBoxChip";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



// Edit Profile component
const EditTreatment = ({ nextStep, prevStep }) => {

    // Set and Get profile form values
    const [treatments, setTreatments] = useState([]);
    const [therapistTreatments, setTherapistTreatments] = useState([]);
    const id = localStorage.getItem("therapist_id")


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
                // nextStep()
            })
            .catch(error => {
                console.log(error)
                console.log(JSON.stringify(treatmentsObj))
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
                            marginY={majorScale(1)}>I can help with?</Heading>
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
                        <form onSubmit={e => postTreatments(e)}>
                            <div className="form-group" onChange={handleChange}>
                                {renderTreatmentsCheckboxes()}
                                <CheckboxChip></CheckboxChip>
                            </div>
                            <Pane display="flex">
                                <Pane flex={1} alignItems="center" display="flex">

                                </Pane>
                                <Pane>
                                    <Button onClick={previous} name="back_button" marginRight={16}>
                                        Back
                                    </Button>
                                    <Button appearance="primary" type="submit">Complete</Button>
                                </Pane>
                            </Pane>
                        </form>
                    </Pane>
                </Pane>
            </Pane>
        </Pane>
    );
};

export default EditTreatment;
