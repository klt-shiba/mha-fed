import styled, { css } from 'styled-components'
import { up } from 'styled-breakpoints';


const CardContainer = styled.div`

${props => {
        if (props.isCard === true) {
            return (props.isCard && css`
            grid-template-columns: auto;
            grid-template-rows: auto; 
            column-gap: 10px;
            row-gap: 15px;
            display: grid;
            width:100%;
            margin: 32px auto;

            ${up('md')} {
                grid-template-columns: repeat(2, minmax(0, 1fr));;
                grid-template-rows: auto auto; 
            }
            ${up('lg')} {
                grid-template-columns: repeat(3, minmax(0, 1fr));;
                grid-template-rows: auto auto auto; 
            }`
            )
        } else {
            return (props.isCard && css`
            display: block;
        `)
        }
    }} 
`;

export default CardContainer
