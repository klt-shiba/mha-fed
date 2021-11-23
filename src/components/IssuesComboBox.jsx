import React from 'react'
import styled, { css } from 'styled-components'
import Autocomplete from '@mui/material/Autocomplete';


const CustomComboBox = styled(Autocomplete)`
`

const IssuesComboxBox = ({ options }) => {

    return (
        <label>
            Value:{' '}
            <Autocomplete
                sx={{
                    display: 'inline-block',
                    '& input': {
                        width: 200,
                        bgcolor: 'background.paper',
                        color: (theme) =>
                            theme.palette.getContrastText(theme.palette.background.paper),
                    },
                }}
                id="custom-input-demo"
                options={options}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input type="text" {...params.inputProps} />
                    </div>
                )}
            />
        </label>
    );
}

export default IssuesComboxBox