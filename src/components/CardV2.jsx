import React from 'react';
import styled, { css } from 'styled-components'
import { Heading, Text, MapMarkerIcon } from 'evergreen-ui';
import { up } from 'styled-breakpoints';
import Bullet from './Bullets';


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
        transform:scale(1.1);
        transition: all 0.5s ease-in-out
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

    & div.location-wrapper {
        display:flex;
        align-items: center;

        & span {
            padding-left: 8px;
        }

    }
    & div.rating-wrapper span{
        font-size:24px;
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
    height: 22.0rem;
    box-sizing: border-box;
    overflow: hidden;
    background: #f2f2f2;
    border-radius: 8px;

    & div.bullet_wrapper {
        position: absolute;
        display: flex;
        justify-content: right;
        width: 100%;
        margin-top:8px;
        margin-left:8px;
        margin-right:8px;
        z-index: 1;
        padding-right: 8px
    }

    ${up('md')} {
        height: 20.0rem;
    }

    & img {
        width: 100%;
        height: 22.0rem;
        object-fit: cover;
        transform: scale(1);
        transition: all 0.5s ease-in-out;
        z-index: 0;

        ${up('md')} {
            height: 20.0rem;
        }
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
                    {props.isPopular && <div className="bullet_wrapper"><Bullet label={`${"👍"} Recommended`} hasColour hasSize="small" /></div>}
                    <img loading="lazy"
                        src={props.imgSrc}
                        alt={props.altTag} />
                </ImgContainer>
                <div className="location-wrapper">
                    <MapMarkerIcon /> <span>{props.hasLocation}</span>

                </div>
                <div>
                    <Heading
                        is="h2"
                        size={700}>{props.title}</Heading>
                </div>
                <div className="summary-card-container">
                    <Text size={400} variant="body2" gutterBottom>{props.body}</Text>
                </div>
                <div className="rating-wrapper">
                    {props.rating}
                </div>
            </div >
        </CardContainer >
    )
}

export default CardV2;