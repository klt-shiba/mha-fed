import React from "react";
import styled from "styled-components";
import { up } from "styled-breakpoints";
import Section from "./Section";
import { Container } from "reactstrap";
import { Button, MapMarkerIcon } from "evergreen-ui";
import { Rating } from "@mui/material";

const CustomSection = styled(Section)`
  background: ${props => props.hasBackgroundColour};
  padding: 0 0;
  width: 100%;
  font-size: 20px;
`;

const CustomContainer = styled(Container)`
  padding: 0 0;

  ${up("sm")} {
    max-width: 767px;
  }

  ${up("md")} {
    max-width: 960px;
  }

  ${up("lg")} {
    max-width: 1140px;
  }
  ${up("xl")} {
    max-width: 1320px;
  }
  
`;

const SplitContainer = styled.div`
  width: 100%;
  background-color: ${props => props.hasBackgroundColour};
  position: relative;


  ${up("md")} {
    display: flex;
    align-items: center;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: ${props => props.hasBackgroundColour};

  ${up("lg")} {
    flex-direction: ${(props) => (props.hasDirection ? "row" : "row-reverse")};
  }
`;

const BannerImgWrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
  height: 320px;

  ${up("xl")} {
    height: 480px;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: block;
  position: relative;
  padding: 32px 16px 32px 16px;
  color: ${props => props.hasFontColour};
  width: 100%;

  ${up("md")} {
    padding: 32px 32px;
    }

  
  & h2 {
    font-size: 32px;
    font-weight: 800;

    ${up("md")} {
        font-size: 44px;
        margin-bottom: 16px;
    }

  }

    
  & > div {
    margin-bottom: 8px;

    ${up("md")} {
        margin-bottom: 16px;
    }

  }
  


`

const ButtonWrapper = styled.div`
    display: ${(props) => (props.hasButton ? "block" : "none")};
    margin-top:24px;

  & button {
        font-size: 17px;
        width: 100%;
        padding: 24px 24px;

        ${up("md")} {
            width: auto;
        }
    }

    
`;

const PrimaryBanner = ({ heading, subHeading, hasButton, buttonLabel, hasDirection, hasImg, hasRating, isRating, hasIcon, hasLocation, hasBackgroundColour, hasFontColour, hasOnClick }) => {


  return (
    <CustomSection hasBackgroundColour={hasBackgroundColour}>
      <CustomContainer>
        <BannerWrapper hasDirection={hasDirection}>
          <SplitContainer>
            <ContentWrapper hasFontColour={hasFontColour}>
              <div>{hasIcon ? <MapMarkerIcon /> : false} {hasLocation}</div>
              <h2>{heading}</h2>
              <div>
                {subHeading}
              </div>
              {hasRating ? <Rating name="read-only" value={isRating} readOnly size="large" /> : false}
              <ButtonWrapper hasButton={hasButton}>
                <Button appearance="default" onClick={hasOnClick}>
                  {buttonLabel}
                </Button>
              </ButtonWrapper>
            </ContentWrapper>
          </SplitContainer>
          <SplitContainer>
            <BannerImgWrapper>
              <img src={hasImg || "https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}></img>
            </BannerImgWrapper>
          </SplitContainer>
        </BannerWrapper>
      </CustomContainer>
    </CustomSection>
  );
};

export default PrimaryBanner;
