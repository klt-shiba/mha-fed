import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.span`
    width:auto;
    border-radius: 24px;
    color: #222;
    margin: 0 8px 8px 0;
    font-weight: 500;
    white-space: nowrap;
    display: inline-flex;

    ${props => {
        if (props.hasColour === "blue") {
            return (props.hasColour && css`
                color: #540d6e;
                background-color: #f8e6ff;
        `)
        }
        else if (props.hasColour === "green") {
            return (props.hasColour && css`
            color: #006d77;
          background-color: #d7f9fc;
          `
            )
        } else {
            return (props.hasColour && css`
            background-color: #E54F6D;
            color: white;
          `
            )
        }
    }} 

    ${props => {
        if (props.hasSize === "small") {
            return (props.hasSize && css`
                padding: 8px 12px;
                font-size: 12px;
                line-height: 20px
        `)
        }
        else if (props.hasSize === "large") {
            return (props.hasSize && css`
                padding: 16px;
          `
            )
        } else {
            return (props.hasSize && css`
                padding: 12px 16px;
                font-size: 15px;
          `
            )
        }
    }} 

`

const Bullet = props => {
    return (
        <Container
            hasSize={props.hasSize}
            hasColour={props.hasColour}>
            {props.label}
        </Container>
    )
}

export default Bullet
