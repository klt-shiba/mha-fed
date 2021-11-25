import React from "react";
import styled, { css } from "styled-components";
import { up } from "styled-breakpoints";
import Section from "./Section";
import { Container } from "reactstrap";
import { Pane, Button } from "evergreen-ui";

const CustomSection = styled(Section)`
  background: black;
  padding: 0 0;
  width: 100%;
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
  background-color: black;
  position: relative;


  ${up("xl")} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: black;

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
  color: white;

  
  & h2 {
    font-size: 32px;
    font-weight: 800;

    ${up("md")} {
        font-size: 44px;
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
        border-radius: 24px;

        ${up("md")} {
            width: auto;
        }
    }

    
`;

const PrimaryBanner = ({ heading, subHeading, hasButton, buttonLabel, hasDirection }) => {
    return (
        <CustomSection>
            <CustomContainer>
                <BannerWrapper hasDirection={hasDirection}>
                    <SplitContainer>
                        <ContentWrapper>
                            <h2>{heading || "Rate my Therapist cat"}</h2>
                            <div>
                                {subHeading ||
                                    "Something about finding a therapist! Some about finding a therapist!"}
                            </div>
                            <ButtonWrapper hasButton={hasButton}>
                                <Button appearance="primary">
                                    {buttonLabel || "Find Therapist"}
                                </Button>
                            </ButtonWrapper>
                        </ContentWrapper>
                    </SplitContainer>
                    <SplitContainer>
                        <BannerImgWrapper>
                            <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"></img>
                        </BannerImgWrapper>
                    </SplitContainer>
                </BannerWrapper>
            </CustomContainer>
        </CustomSection>
    );
};

export default PrimaryBanner;
