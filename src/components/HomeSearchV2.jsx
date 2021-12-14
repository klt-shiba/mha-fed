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


const HomeSearchV2 = (issuesArray) => {

    const [searchBy, setSearchBy] = useState('Issue');
    const [queries, setQueries] = useState([]);
    const [multipleQueries, setMultipleQueries] = useState([]);

    const handleChange = (event) => {
        setSearchBy(event.target.value);
    };

    const handleSecondChange = (event) => {
        setQueries(event.target.value);
        console.log(queries)
    };

    const fetchTherapists = (query) => {
        const url = "https://damp-journey-90616.herokuapp.com/api/v1/therapists";
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => {
                history.push({
                    pathname: '/therapists',
                    search: `?${searchBy}=${query}`,
                    state: response
                })
            })
            .catch((error) => {
                console.log(error);
                history.push("/");
            });
    };


    const onClick = (e) => {

        if (searchBy === "State" || searchBy === "Profession") {

            fetchTherapists(queries)

        } else if (searchBy === "Issue" && queries.length >= 1) {

            const cleanIssues = []

            queries.map((el) => {
                cleanIssues.push(el.name)
            })
            fetchTherapists(cleanIssues.toString())
        } else {
            console.log("All Therapist Selected")
            setQueries("")
            fetchTherapists()
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
        } else if (searchBy === 'State') {
            return locationArray
        } else if (searchBy === 'Profession') {
            return professionArray
        } else {
            return array
        }
    }

    const history = useHistory()

    const renderSelectOptions = () => {
        if (searchBy === 'State') {
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
        e.preventDefault()
        console.log(e)
        console.log(multipleQueries)
        setMultipleQueries(e.target.text)
    }

    // const chooseSearchFieldType = () => {

    //     if (searchBy === 'Issue') {
    //         return (
    //             <Autocomplete
    //                 fullWidth
    //                 multiple
    //                 limitTags={2}
    //                 id="autocomplete"
    //                 options={handleArray(issuesArray)}
    //                 getOptionLabel={(option) => option.name}
    //                 onChange={(event, newValue) => {
    //                     setMultipleQueries(newValue)
    //                 }}
    //                 onInputChange={handleInputChange}
    //                 renderInput={(params) => (
    //                     <TextField {...params} label={`Search by ${searchBy}`} inputValue={"value"} onChange={handleChipChange} placeholder={searchBy[0].name} />
    //                 )}
    //             />
    //         )
    //     } else {
    //         return (
    //             <FormControl fullWidth>
    //                 <InputLabel id="select_options_label">{`Search by ${searchBy}`}</InputLabel>
    //                 <Select
    //                     labelId="select_options"
    //                     id="select_options_id"
    //                     value={queries}
    //                     label={`Search by ${searchBy}`}
    //                     onChange={handleSecondChange}
    //                 >
    //                     {renderSelectOptions()}
    //                 </Select>
    //             </FormControl>
    //         )
    //     }
    // }
    const handleInputChange = (e) => {
        console.log(e)
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
                            <MenuItem value="State">State</MenuItem>
                            <MenuItem value="Profession">Profession</MenuItem>
                        </Select>
                    </CustomFormControl>
                    {(searchBy === 'Issue') ?
                        <Autocomplete
                            fullWidth
                            multiple
                            limitTags={3}
                            id="autocomplete"
                            options={handleArray(issuesArray)}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                setQueries(newValue)
                            }}
                            onInputChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField {...params} label={`Search by ${searchBy}`} inputValue={"value"} placeholder={searchBy[0].name} />
                            )}
                        /> :
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
                    }
                    {/* {chooseSearchFieldType()} */}
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


export default HomeSearchV2