import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import { Rating } from '@mui/material'

const Container = styled.div`
    width:100%;
    height: auto; 

    /* & div.heading-aligner {
        margin: -3.6rem 0;
        background-color: rgba(0,0,0,0.9);
        z-index: ;
    } */

    & div.header-wrapper {
        display: block;
        border-bottom: 1px solid #aaa;
        margin-bottom: 0.8rem;
    }
`

const Heading = styled.h2`
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
`

const InfoBlock = props => {
    return (
        <Container>
            <div className="header-wrapper">
                <Heading>{props.heading}</Heading>
            </div>
            <div>
                {props.content}
            </div>
        </Container>
    )
}

export default InfoBlock
