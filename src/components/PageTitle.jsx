import styled from 'styled-components'
import React from 'react';
import { Container } from 'reactstrap';
import { up } from 'styled-breakpoints'

const HomeBannerContainer = styled.div`
    width: 100%;
    background-repeat: no-repeat;
    background-color:${props => props.hasBackgroundColour};
    height: ${props => props.isSmall ? "auto" : "560px"};
    position: relative;
    overflow: hidden;
    align-items: center;
    display: flex;

    ${up("md")} {
        height: ${props => props.isSmall ? "auto" : "800px"};
        }   

    & img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0.35;
        filter: blur(2px);
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
        padding: 40px 0;

    ${up("md")} {
        padding: 72px 0;
        }
    & > * {
        margin-bottom: 12px;

        ${up("md")} {
            margin-bottom: 24px;
        }   
    }

    & > *:last-child {
        margin-bottom: 0px;
    }
}
`
const Heading = styled.h1`
    display: block;
    font-size: 32px;
    line-height: 36px;
    font-weight: 900;
    margin: 0rem;
    text-align: center;
    color: #412d5a;

    ${up("md")} {
        font-size: 54px;
        line-height: 56px;
    }   
`

const Summary = styled.span`
    display: block;
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin: 0rem;
    text-align: center;

    ${up("md")} {
        font-size: 24px;
        line-height: 32px;
        } 
`

const PageTitle = (props) => {
    return (
        <>
            <HomeBannerContainer isSmall={props.isSmall} hasBackgroundColour={props.hasBackgroundColour || "#bba4dc"}>
                <img src={props.src} alt={props.alt || "Nice image of a sunset"}></img>
                <Container fluid="xl" >
                    <div className="content_aligner">
                        <Heading>{props.title || "Welcome"}</Heading>
                        <Summary>{props.summary || "Welcome"}</Summary>
                        {props.searchBar}
                    </div>
                </Container>
            </HomeBannerContainer>

        </>
    )
}

export default PageTitle