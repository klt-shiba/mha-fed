import React, { useState, useEffect, useContext } from "react";
import { Pane, Button, majorScale } from "evergreen-ui";
import CheckboxChip from "./CheckBoxChip";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from 'react-redux'
import { postTreatments } from '../reducers/therapistActions'
import LinearProgress from '@mui/material/LinearProgress';
import PageTitle from './PageTitle'

// Edit Profile component
const EditTreatment = ({ nextStep, prevStep }) => {
    const therapistStore = useSelector(state => state.therapistReducer)
    // Set and Get profile form values
    const [treatments, setTreatments] = useState([]);
    const [therapistTreatments, setTherapistTreatments] = useState([]);
    const { user, setUser } = useContext(UserContext)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const treatmentsObj = {
        therapist: {
            treatments: therapistTreatments
        }
    }

    const fetchTreatments = () => {
        fetch("https://damp-journey-90616.herokuapp.com/api/v1/treatments")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((r) => {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        let id = therapistStore.therapist.id
        dispatch(postTreatments(treatmentsObj, id))
    };

    useEffect(() => {
        redirectWhenUserReturned()
    }, [therapistStore]);

    const redirectWhenUserReturned = () => {

        if (!user && !therapistStore) {
            return false
        } else {
            if (therapistStore.hasTreatment) {
                setIsLoading(false)
                nextStep()
            } else {
                setIsLoading(false)
                return false
            }
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTreatments();
    }, []);

    const handleChange = (e) => {
        const rawValue = e.target.value
        const idValue = rawValue.split("_")
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

    return (
        <>
            <PageTitle
                isSmall
                title="Approaches I take"
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
                            <form onSubmit={e => handleSubmit(e)}>
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
