import styled, { css } from 'styled-components'
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';

const HomeBannerContainer = styled.div`
    width: 100%;
    background-repeat: no-repeat;
    background-color: black;
    height: ${props => props.isSmall ? "auto" : "800px"};
    display: block;
    position: relative;
    overflow: hidden;

    & img {
        object-fit: fill;
        width: 100%;
        height: auto;
        position: absolute;
        top:0;
        left:0;
        z-index: 0;
        opacity: 0.5;
        filter: blur(2px);
        background-color: blue;
    }

    & div.content_aligner {
        z-index: 2;
        position: relative;
        color: white;
        vertical-align: baseline;
        align-items: center;
        justify-content: center;
        padding: 4.0rem 0;


        & > *:last-child {
            margin-top: 32px;
        }
    }
`
const Heading = styled.h1`
    display: block;
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0.8rem;
    text-align: center;
`

const Summary = styled.span`
    display: block;
    font-size: 1.8rem;
    margin: 0.8rem;
    text-align: center;
`

const HomeBanner = (props) => {
    return (
        <div>
            <HomeBannerContainer isSmall={props.isSmall}>
                <img src={props.src}></img>
                <Container fluid="xl" >
                    <div className="content_aligner">
                        <Heading>{props.title || "Welcome"}</Heading>
                        <Summary>{props.summary || "Welcome"}</Summary>
                        {props.searchBar}
                    </div>
                </Container>
            </HomeBannerContainer>

        </div>
    )
}

export default HomeBanner