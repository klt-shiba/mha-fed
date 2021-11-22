import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import Section from "./Section"
import { Button } from 'evergreen-ui'


const Container = styled.span`
    width: 100%;
    border-radius: 12px;
    font-weight: 600;
    color: #333;
    display: block;
    padding: 0 1.6rem;
    background-color: white;
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
    margin: 0 auto;

    & div.header-wrapper {
        text-align: center;
        display:block;
        width: 100%;
    }

    & div.header-wrapper h1 {
        font-size: 32px;
        font-weight: 600;
    }

    & div.header-wrapper span {
        font-size: 17px;
        font-weight: 400;
    }

    & form > div {
        margin-bottom:2.4rem
    }

    & form > div:last-of-type {
        margin-bottom:0rem
    }

    & div.button-wrapper {
        display: flex;
        flex-direction: column;
    }

    & div.button-wrapper button {
        font-size: 1rem;
        font-weight: 500;
        width: 100%;
        display:block;
        height: 48px;
        line-height: 48px;
    }

    & div.button-wrapper button:last-of-type {
        order: 1;
        margin-bottom: 16px;
    }

    & div.button-wrapper button {
        order: 2;
    }

    ${up('md')} {
        box-shadow: 0 3px 6px 0 rgba(0,0,0,0.15);
        padding: 40px 24px 24px 24px;
        max-width: 610px;

        & div.button-wrapper {
        display: flex;
        justify-content: right;
        flex-direction: row-reverse
        }
        & div.button-wrapper button {
        width: auto;
        }
        & div.header-wrapper h1 {
        font-size: 48px;
        }
        & div.header-wrapper span {
            font-size: 21px;
            font-weight: 400;
        }
        & form > div {
            margin-bottom: 40px
        }
        & form > div:last-of-type {
            margin-bottom: 0px
        }
        & div.button-wrapper button:last-of-type {
            margin-bottom: 0px;
        }
    }

    ${up('xl')} {
        padding: 48px 32px 32px 32px;
        max-width: 720px;
    }

`

const FormCard = props => {
    return (
        <Container
            hasSize={props.hasSize}
            hasColour={props.hasColour}>
            <form onSubmit={props.onSubmit}>
                <div className="header-wrapper">
                    <h1>{props.formHeading}</h1>
                    <span>{props.formSubheading}</span>
                </div>
                <div className="body-wrapper">
                    {props.inputBody}
                </div>
                <div className="button-wrapper">
                    <Button type="submit" size="large" marginRight={16} onClick={props.onSecondaryClick}> {props.secondaryLabel || "secondaryLabel"}</Button>
                    <Button type="submit" appearance="primary" size="large" onClick={props.onPrimaryClick}> {props.primaryLabel || "primaryLabel"} </Button>
                </div>
            </form>
        </Container>
    )
}

export default FormCard
