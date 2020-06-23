//import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
const spinnerKey = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;

  position: relative;
  animation: ${spinnerKey} 1.2s linear infinite;

  border-bottom: ${({ border }) => border}px solid transparent;
  border-left: ${({ border }) => border}px solid
    ${(props) => props.theme.buttonBackgroud};
  border-radius: 50%;
  border-right: ${({ border }) => border}px solid transparent;
  border-top: ${({ border }) => border}px solid
    ${(props) => props.theme.buttonBackgroud};
`;

Spinner.defaultProps = {
  border: 5,
  size: 50,
};

Spinner.propTypes = {
  border: PropTypes.number,
  size: PropTypes.number,
};

export default Spinner;
