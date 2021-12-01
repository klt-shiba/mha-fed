import React from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";


const Container = styled.div`
    width: 100%;
    padding: 12px 0;

    & > div {
        margin-bottom: 8px;
    }

    &  span.rating-date, span.rating-author {
       font-size: 15px;
       color: #777;
       font-style: italic;
    }
`

const TherapistRatingCard = ({ isRating, hasComment, hasAuthor, hasDate }) => {
    return (
        <Container>
            <Rating name="read-only" value={isRating} readOnly size="medium" />
            <div className="rating-comment">{hasComment}</div>
            <div>
                <span className="rating-author">{hasAuthor} - </span>
                <span className="rating-date">{hasDate}</span>
            </div>
        </Container>
    )
}

export default TherapistRatingCard