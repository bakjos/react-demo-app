import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import IconPanel from "./index";

const ExclamationIcon = styled(FontAwesomeIcon).attrs({
  icon: faExclamationCircle,
})`
  width: 70px;
  height: 70px;
  color: ${({ theme }) => theme.primaryColor};
`;

const ErrorPanel = ({ title }) => {
  return (
    <IconPanel title={title}>
      <ExclamationIcon />
    </IconPanel>
  );
};

export default ErrorPanel;
