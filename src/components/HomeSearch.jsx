import React, { useState } from "react";
import { Box, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Button } from "evergreen-ui";
import styled, { css } from 'styled-components'


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


const HomeSearch = () => {

    const [searchBy, setSearchBy] = useState('Issue');

    const handleChange = (event) => {
        setSearchBy(event.target.value);
    };


    return (
        <>
            <SearchContainer>
                <div>
                    <CustomFormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchBy}
                            label="Search by"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Issue"}>Issue</MenuItem>
                            <MenuItem value={"Location"}>Location</MenuItem>
                            <MenuItem value={"Profession"}>Profession</MenuItem>
                        </Select>
                    </CustomFormControl>
                    <TextField id="Search" label={`Search by ${searchBy}`} variant="outlined"
                        fullWidth />
                    <Button
                        height={56}
                        marginLeft={16}
                        appearance="primary"
                        width={120}>Search</Button>

                </div>
            </SearchContainer>
        </>
    )
}


export default HomeSearch