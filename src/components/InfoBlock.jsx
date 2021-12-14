import React from 'react'
import styled from 'styled-components'
import { up } from 'styled-breakpoints'
import { EditIcon } from 'evergreen-ui'

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
        display: flex;
        flex-direction:row ;
        border-bottom: 1px solid #aaa;
        margin: 1.2rem 0;
        justify-content: space-between;
    }

    & div.body-wrapper {
        font-size: 17px;
        display: flex;
        flex-direction: column;

        ${up('md')} {
            font-size: 19px;
            line-height: 28px
               
        }
    }

`
const Heading = styled.h2`
    display: block;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 1.2rem 0;
`

const InfoBlock = ({ heading, content, links, hasUpdateLink, hasIcon }) => {
    return (
        <Container>
            <div className="header-wrapper">
                <Heading>{heading}</Heading> {hasUpdateLink ? <span> {hasIcon ? <EditIcon color="info" marginRight={8} /> : false}{links}</span> : false}
            </div>
            <div className="body-wrapper">
                {content}
            </div>
            {/* <div className="link-wrapper">
                <span><EditIcon color="info" marginRight={8} />{links}</span>
            </div> */}
        </Container>
    )
}

export default InfoBlock
