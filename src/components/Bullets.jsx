import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import { Rating } from '@mui/material'

const Container = styled.span`
    width:auto;
    font-size: 1.2rem;
    border-radius: 24px;
    font-weight: 600;
    color: #333;
    margin: 0 8px 8px 0;
    ${props => {
        if (props.hasColour === "blue") {
            return (props.hasColour && css`
         background-color: lightblue;
        `)
        }
        else if (props.hasColour === "green") {
            return (props.hasColour && css`
          background-color: lightgreen;
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
                padding: 8px;
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
                padding: 12px;
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
