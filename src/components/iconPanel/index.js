import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  background-color: ${({ customBackground }) => customBackground};
`;

const Wrapper = styled.div`
  margin: auto;
`;

const TextContainer = styled.div`
  & p {
    padding: 0px;
    margin: 0px;
    text-align: center;
  }
`;

const IconPanel = ({ title, children, customBackground }) => {
  return (
    <Container customBackground={customBackground}>
      <Wrapper>
        {children}
        <TextContainer>
          <p>{title}</p>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

IconPanel.defaultProps = {
  customBackground: "white",
};

IconPanel.propTypes = {
  title: PropTypes.string,
  customBackground: PropTypes.string,
};

export default IconPanel;
