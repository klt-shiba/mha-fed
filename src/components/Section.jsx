import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints';

const Section = styled.section`
  padding: 32px 0;
  background-color: white;
  display: ${props => props.isHidden ? "none" : "block"};

  ${up('md')} {
    padding: 40px 0rem;
    background-color: ${props => props.backgroundColour};
  }
  ${up('lg')} {
    padding:72px 0rem;
  }
`;


export default Section