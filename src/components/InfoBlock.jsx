import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import { Rating } from '@mui/material'

const Container = styled.div`
    width:100%;
    height: auto; 
    margin-bottom: 2.4rem;

    & > div {
        margin-bottom: 12px;
    }

    ${up('md')} {
        margin-bottom: 3.2rem;
               
    }
    & div.header-wrapper {
        display: block;
        border-bottom: 1px solid #aaa;
        margin: 1.2rem 0;
    }

    & div.body-wrapper {
        font-size: 17px;
        display: flex;
        flex-direction: column;
    }

`
const Heading = styled.h2`
    display: block;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 1.2rem 0;
`

const InfoBlock = ({ heading, content, links }) => {
    return (
        <Container>
            <div className="header-wrapper">
                <Heading>{heading}</Heading>
            </div>
            <div className="body-wrapper">
                {content}
            </div>
            <div className="link-wrapper">
                {links}
            </div>
        </Container>
    )
}

export default InfoBlock
