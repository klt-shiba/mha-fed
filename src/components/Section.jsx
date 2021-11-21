import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints';

const Section = styled.section`
  padding: 0.8rem 0rem;
  background-color: ${props => props.backgroundColour};
  display: ${props => props.isHidden ? "none" : "block"};

  ${up('md')} {
    padding: 1.2rem 0rem;
  }
  ${up('lg')} {
    padding: 2.4rem 0rem;
  }
`;


export default Section