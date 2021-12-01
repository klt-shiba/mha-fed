import React, { useState } from "react";
import { Autocomplete, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Button } from "evergreen-ui";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const SearchContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
    display: block;
    max-width: 920px;
    margin: 0 auto;

    & > div {
        display: flex;
    }
    & > div {
        display: flex;
    }
`


const CustomFormControl = styled(FormControl)`
    width: 25% !important;
    margin-right: 16px !important;
`


const HomeSearch = (issuesArray) => {

    const [searchBy, setSearchBy] = useState('Issue');
    const [queries, setQueries] = useState([]);
    const [multipleQueries, setMultipleQueries] = useState([]);

    const handleChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSecondChange = (event) => {
        setQueries(event.target.value);
    };

    const onClick = (e) => {
        if (searchBy === "Location" || searchBy === "Profession") {
            fetch(`http://127.0.0.1:3001/api/v1/therapists/search?q=${queries}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    'key': searchBy,
                    'query': queries
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    history.push({
                        pathname: '/therapists',
                        search: `?q=${queries}`,
                        state: data
                    })
                }).catch((error) => console.log(error))
        } else {
            console.log("Borked")
            return false
        }
    }
    const locationArray = [
        {
            name: 'Australian Capital Territory'
        },
        {
            name: 'New South Wales'
        },
        {
            name: 'Victoria'
        },
        {
            name: 'Queensland'
        },
        {
            name: 'South Australia'
        },
        {
            name: 'Western Australia'
        },
        {
            name: 'Tasmania'
        },
        {
            name: 'Northern Territory'
        }
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
        } else if (searchBy === 'Location') {
            return locationArray
        } else if (searchBy === 'Profession') {
            return professionArray
        } else {
            return array
        }
    }

    const history = useHistory()

    const renderSelectOptions = () => {
        if (searchBy === 'Location') {
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
        console.log(multipleQueries)
        setMultipleQueries(e.target.text)
    }

    const handleInputChange = (e) => {
    }


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
                        setMultipleQueries(newValue)
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
                            <MenuItem value="Location">Location</MenuItem>
                            <MenuItem value="Profession">Profession</MenuItem>
                        </Select>
                    </CustomFormControl>
                    {chooseSearchFieldType()}
                    <Button
                        type="submit"
                        height={56}
                        marginLeft={16}
                        appearance="primary"
                        width={120}
                        onClick={onClick}>
                        Search
                    </Button>

                </div>
            </SearchContainer>
        </>
    )
}


export default HomeSearch