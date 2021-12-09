import styled, { css } from 'styled-components'
import React from 'react';
import { Container } from 'reactstrap';
import { up } from 'styled-breakpoints'

const HomeBannerContainer = styled.div`
    width: 100%;
    background-repeat: no-repeat;
    background-color:${props => props.hasBackgroundColour};
    height: ${props => props.isSmall ? "auto" : "800px"};
    position: relative;
    overflow: hidden;
    align-items: center;
    display: flex;

    & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0.6;
    filter: blur(4px);
    background-color: ${props => props.hasBackgroundColour};

        ${up("lg")} {
        object-fit: cover;
        height: 100%;
    }
}

    & div.content_aligner {
    z-index: 2;
    position: relative;
    color: ${props => props.hasFontColour};;
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
font-size: 54px;
font-weight: 800;
margin: 0.8rem;
text-align: center;
`

const Summary = styled.span`
display: block;
font-size: 20px;
margin: 0.8rem;
text-align: center;
`

const PageTitle = (props) => {
    return (
        <div>
            <HomeBannerContainer isSmall={props.isSmall} hasBackgroundColour={props.hasBackgroundColour}>
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

export default PageTitle