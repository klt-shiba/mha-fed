import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Button } from "evergreen-ui";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { up } from 'styled-breakpoints'


const SearchContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
    display: block;
    max-width: 920px;
    margin: 0 auto;

    & > div.content-wrapper {
        display: flex;
        flex-direction: column;

        ${up("md")} {
            flex-direction: row;
            width: 100%;
            justify-content: space-between
        }   

        & > div {
            display: flex;
            flex-direction: column;
            margin-bottom: 8px;

            ${up("md")} {
                width: 100%;
                flex-direction: row;
                margin-bottom: 0px;
                margin-right: 16px;
            }   

            & > div {
                margin-bottom: 8px;

                ${up("md")} {
                    margin-bottom: 0px;
                }   
            }

            & > div:last-of-type {
                
                ${up("md")} {
                    width: 75%;
                }   
        }
    }

    & div.button-wrapper {
        display: flex;
        margin-bottom: 0px;

        & button {
            width:100%;

            ${up("md")} {
                width: 120px;
                margin-bottom: 0px;
            }   
        }


        ${up("md")} {
                width: 120px;
                margin-right: 0px;
                margin-bottom: 0px;
        }   

    }
`


const CustomFormControl = styled(FormControl)`
    width: 100% !important;
    margin-right: 16px !important;

    ${up("md")} {
        width: 25% !important;
    }   

`


const HomeFilterSearchBar = ({ issuesArray, therapistsArray, clearSearch }) => {

    const history = useHistory()

    const [searchBy, setSearchBy] = useState('Issue');
    const [queries, setQueries] = useState([]);
    const [multipleQueries, setMultipleQueries] = useState([]);
    const [therapists, setTherapists] = useState([])

    const handleChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSecondChange = (event) => {
        setQueries(event.target.value);
    };
    const onClick = (e) => {
        if (searchBy === "Profession" || searchBy === "City") {
            history.push({
                path: `/therapists`,
                search: `?${searchBy}=${queries}`,
                state: { data: therapists }
            })
        } else if (searchBy === "Issue" && queries.length >= 1) {
            const cleanIssues = []

            let createArray = queries.map((el) => {
                cleanIssues.push(el.name)
            })

            history.push({
                path: `/therapists`,
                search: `?${searchBy}=${cleanIssues.toString()}`,
                state: { data: therapists }
            })

        } else {
            history.push({
                path: `/therapists`,
                search: ``,
                state: { data: therapists }
            })
        }
    }
    const locationArray = [
        { name: "Auckland" },
        { name: "Wellington" },
        { name: "Christchurch" },
        { name: "Hamilton" },
        { name: "Tauranga" },
        { name: "Napier-Hastings" },
        { name: "Dunedin" },
        { name: "Palmerston North" },
        { name: "Nelson" },
        { name: "Rotorua" },
        { name: "Whangārei" },
        { name: "New Plymouth" },
        { name: "Invercargill" },
        { name: "Whanganui" },
        { name: "Gisborne" }
    ]
    const professionArray = [
        {
            name: 'Psychologist'
        },
        {
            name: 'Social worker'
        },
        {
            name: 'Counsellor'
        },
        {
            name: 'Psychotherapist'
        }
    ]
    const handleArray = (array) => {
        if (!array) {
            return false
        } else if (searchBy === 'City') {
            return locationArray
        } else if (searchBy === 'Profession') {
            return professionArray
        } else {
            return array
        }
    }

    const renderSelectOptions = () => {
        if (searchBy === 'City') {
            return (
                locationArray.map((el) => {
                    return (
                        <MenuItem value={el.name}>{el.name}</MenuItem>
                    )
                })
            )
        } else if (searchBy === 'Profession') {
            return (
                professionArray.map((el) => {
                    return (
                        <MenuItem value={el.name}>{el.name}</MenuItem>
                    )
                })
            )
        } else {
            return false
        }
    }

    const handleChipChange = (e) => {
        setMultipleQueries(e.target.text)
    }

    const handleInputChange = (e) => {
    }

    const checkIfTherapistExists = (array) => {

        if (!array) {
            return false
        } else {
            setTherapists(array)
        }
    }


    useEffect(() => {
        checkIfTherapistExists(therapistsArray)
    }, [therapistsArray])


    const chooseSearchFieldType = () => {

        if (searchBy === 'Issue') {
            return (
                <Autocomplete
                    fullWidth
                    multiple
                    limitTags={2}
                    id="autocomplete"
                    options={handleArray(issuesArray)}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                        setQueries(newValue)
                    }}
                    onInputChange={handleInputChange}
                    renderInput={(params) => (
                        <TextField {...params} label={`Search by ${searchBy}`} inputValue={"value"} onChange={handleChipChange} placeholder={searchBy[0].name} />
                    )}
                />
            )
        } else {
            return (
                <FormControl fullWidth>
                    <InputLabel id="select_options_label">{`Search by ${searchBy}`}</InputLabel>
                    <Select
                        labelId="select_options"
                        id="select_options_id"
                        value={queries}
                        label={`Search by ${searchBy}`}
                        onChange={handleSecondChange}
                    >
                        {renderSelectOptions()}
                    </Select>
                </FormControl>
            )
        }
    }
    return (
        <>
            <SearchContainer>
                <div className="content-wrapper">
                    <div>
                        <CustomFormControl fullWidth>
                            <InputLabel id="therapist_filter_label">Filter by</InputLabel>
                            <Select
                                labelId="therapist_filter_label"
                                id="therapist_filter"
                                value={searchBy}
                                label="Search by"
                                onChange={handleChange}
                            >
                                <MenuItem value="Issue">Issue</MenuItem>
                                <MenuItem value="City">City</MenuItem>
                                <MenuItem value="Profession">Profession</MenuItem>
                            </Select>
                        </CustomFormControl>
                        {chooseSearchFieldType()}
                    </div>
                    <div className="button-wrapper">
                        <Button
                            type="submit"
                            height={56}
                            appearance="primary"
                            onClick={onClick}
                            fontSize="17px">
                            Search
                        </Button>
                    </div>
                </div>
            </SearchContainer>
        </>
    )
}


export default HomeFilterSearchBar