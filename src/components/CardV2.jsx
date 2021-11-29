import React from 'react';
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints';
import { Heading, Text } from 'evergreen-ui';
import { Rating } from "@mui/material";


const CardContainer = styled.a`
    
    ${props => {
        if (props.isSquare) {
            return (props.isSquare && css`
          /* border: 1px solid red;
          background-color: saddlebrown; */
        `)
        }
        else {
            return (props.isSquare && css`
          /* background-color: white;
          border: 1px solid grey; */
          `
            )
        }
    }} 
    
    display: flex;
    align-items: flex-start;
    background-color: white;
    text-align: left;
    text-decoration: none;
    border: 0px;
    padding: 0.4rem 0;

    & h2 {
        font-weight: 700;
        font-size: 28px;
    }
    &:hover {
        background-color: #fafafa;
    }

    &:hover img {
        opacity:0.9;
    }

    &:hover h2 {
        text-decoration: underline;
    }
    
    & span {

        font-size: 20px;
        font-weight: 400;
    }

    & div.summary-card-container span{
        line-height: 28px;
        color: #444;
    }
    & div {
        width:100%;
        margin-bottom: 12px;
    }
`;


const ImgContainer = styled.div`

${props => {
        if (props.isLoading) {
            return (props.isLoading && css`
            background-color: linear-gradient(	 
                to right,
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 80%
                ),
                lightgray;
            background-repeat: repeat-y;
            background-size: 50px 500px;
            background-position: 0 0;
            animation: shine 1s infinite;	

            & img {
                display: none;
            }
       }
        `)
        }
        else {
            return (props.isLoading && css`
         display: block;
          `
            )
        }
    }} 
    width: 100%;
    position:relative;
    margin-bottom: 1.2rem;
    height: 16.0rem;
    box-sizing: border-box;
    overflow: hidden;
    background: #f2f2f2;
    border-radius: 8px;

    & img {
        width: 100%;
        height: 16.0rem;
        object-fit: cover;
    }
    @keyframes shine {
    to {
    background-position: 100% 0, /* move highlight to right */ 0 0;
  }
}
`

const CardV2 = (props) => {
    return (
        <CardContainer
            padding={props.padding}
            isSquare={props.isSquare}
            id={props.id}
            onClick={props.onClick}
            href={props.href}
        >
            <div>
                <ImgContainer
                    isLoading={props.isLoading}>
                    <img loading="lazy"
                        src={props.imgSrc}
                        alt={props.altTag} />
                </ImgContainer>
                <div >
                    {props.rating}
                </div>
                <div>
                    <Heading
                        is="h2"
                        size={700}>{props.title}</Heading>
                </div>
                <div className="summary-card-container">
                    <Text size={400} variant="body2" gutterBottom>{props.body}</Text>
                </div>
            </div>
        </CardContainer >
    )
}

export default CardV2;