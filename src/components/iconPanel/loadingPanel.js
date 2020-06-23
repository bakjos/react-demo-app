import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import IconPanel from "./index";

const StyledSpinner = styled(Spinner)`
  margin: auto;
`;

const LoadingPanel = ({ title, customBackground }) => {
  return (
    <IconPanel title={title} customBackground={customBackground}>
      <StyledSpinner />
    </IconPanel>
  );
};

LoadingPanel.propTypes = {
  title: PropTypes.string,
  customBackground: PropTypes.string,
};

export default LoadingPanel;
