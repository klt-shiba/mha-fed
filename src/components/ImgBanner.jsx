import React from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints'
import { Rating } from '@mui/material'

const ImgContainer = styled.div`
    width:auto;
    height: 100%;
`

const Img = styled.img`
  width: 100%;
  height: auto;
  width: 100%;
  height: 18.0rem;
  object-fit: cover;
  border-radius: 8px;
`

const Heading = styled.h1`
    display: block;
    font-size: 2.4rem;
    font-weight: 800;
    margin-top: 0.8rem;
`

const ImgBanner = props => {
    return (
        <ImgContainer>
            <Img src={props.src} alt={props.alt}></Img>
            <div className="heading-aligner">
                <Heading>{props.heading}</Heading>
                <Rating name="read-only" value={props.rating} readOnly size="large" />
            </div>
        </ImgContainer>
    )
}

export default ImgBanner
