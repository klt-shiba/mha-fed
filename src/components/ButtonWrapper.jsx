import styled from 'styled-components';
import { up } from 'styled-breakpoints';

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;

    
    ${up("md")} {
         justify-content: end;
      }   

    & button {
      width: 100%;

      ${up("md")} {
          width: auto;
      }   
    
    }
    
`

export default ButtonWrapper