import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.span`
    width:auto;
    font-size: 1.2rem;
    border-radius: 24px;
    font-weight: 600;
    color: #666;
    margin: 0 8px 8px 0;
    white-space: nowrap;
    display: inline-flex;

    ${props => {
        if (props.hasColour === "blue") {
            return (props.hasColour && css`
         background-color: #dff7ff;
        `)
        }
        else if (props.hasColour === "green") {
            return (props.hasColour && css`
          background-color: #cff8cf;
          `
            )
        } else {
            return (props.hasColour && css`
          background-color: #f2f2f2;
          `
            )
        }
    }} 

    ${props => {
        if (props.hasSize === "small") {
            return (props.hasSize && css`
                padding: 8px 12px;
                font-size: 1rem;
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
                font-size: 1.2rem;

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
