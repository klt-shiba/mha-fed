import React from 'react'
import styled, { css } from 'styled-components'
import Section from './Section'
import { Button } from 'evergreen-ui'



const Wrapper = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    & div.heading-wrapper {
        margin-bottom: 24px;
        width: 100%;
        max-width: 720px;
    }

    & h2 {
        font-size: 40px;
        font-weight: 800;
    }

    & div.subheading-wrapper {
        font-size: 20px;
    }

    & div.heading-wrapper > * {
        margin-bottom: 16px;
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
                        onClick={hasOnClick} >
                        {hasButtonLabel}
                    </Button> : false}
                </div>
            </Wrapper>
        </Section></>

    )
}


export default ActionStrip