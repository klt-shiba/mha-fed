import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints';

const Section = styled.section`
  padding-top: ${props => props.hasPaddingTop ? "32px" : "0"};
  padding-bottom: ${props => props.hasPaddingBottom ? "32px" : "0"};
  background-color: white;
  display: ${props => props.isHidden ? "none" : "block"};

  ${up('md')} {
    padding-top: ${props => props.hasPaddingTop ? "40px" : "0"};
  padding-bottom: ${props => props.hasPaddingBottom ? "40px" : "0"};
    background-color: ${props => props.backgroundColour};
  }
  ${up('lg')} {
    padding-top: ${props => props.hasPaddingTop ? "72px" : "0"};
  padding-bottom: ${props => props.hasPaddingBottom ? "72px" : "0"};
  }
`;


export default Section