import React from 'react'
import styled from 'styled-components'
import Section from './Section'
import { Button } from 'evergreen-ui'
import { up } from 'styled-breakpoints'


const Wrapper = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 16px;

    & div.heading-wrapper {
        margin-bottom: 24px;
        width: 100%;
        max-width: 720px;
    }

    & h2 {
        font-size: 28px;
        font-weight: 800;

        ${up("md")} {
            font-size: 40px;
        }   
    }

    & div.subheading-wrapper {
        font-size: 20px;
    }
`

const ActionStrip = ({ hasBackgroundColour, hasHeading, hasSubHeading, hasOnClick, hasButton, hasButtonLabel }) => {
    return (
        <><Section
            hasPaddingTop
            hasPaddingBottom
            backgroundColour={hasBackgroundColour}>
            <Wrapper>
                <div className="heading-wrapper">
                    <h2>{hasHeading}</h2>
                    <div className="subheading-wrapper">{hasSubHeading}</div>
                </div>
                <div className="button-wrapper">
                    {hasButton ? <Button
                        type="submit"
                        appearance="primary"
                        size="large"
                        height={48}
                        fontSize="17px"
                        onClick={hasOnClick} >
                        {hasButtonLabel}
                    </Button> : false}
                </div>
            </Wrapper>
        </Section></>

    )
}


export default ActionStrip