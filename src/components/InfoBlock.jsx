import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import { Rating } from '@mui/material'

const Container = styled.div`
    width:100%;
    height: auto; 
    margin-bottom: 2.4rem;

    & div.header-wrapper {
        display: block;
        border-bottom: 1px solid #aaa;
        margin: 1.2rem 0;
    }
    ${up('md')} {
        margin-bottom: 3.2rem;
               
    }

`

const Heading = styled.h2`
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.2rem 0;
`

const InfoBlock = ({ heading, content, links }) => {
    return (
        <Container>
            <div className="header-wrapper">
                <Heading>{heading}</Heading>
            </div>
            <div>
                {content}
            </div>
            <div>
                {links}
            </div>
        </Container>
    )
}

export default InfoBlock
