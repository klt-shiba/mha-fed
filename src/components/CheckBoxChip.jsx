import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components'


const CheckboxChip = styled.input.attrs({ type: 'checkbox' })`
border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;  
`


export default CheckboxChip