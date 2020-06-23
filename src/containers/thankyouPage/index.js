import React from "react";
import Panel from "../../components/panel";
import { useSelector } from "react-redux";
import { getAnswers } from "../../reducers";
import { Redirect } from "react-router-dom";
import IconPanel from "../../components/iconPanel";
import styled from "styled-components";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InformationIcon = styled(FontAwesomeIcon).attrs({
  icon: faInfoCircle,
})`
  min-width: 70px;
  height: 70px;
  color: ${({ theme }) => theme.buttonBackgroud};
`;

const ThankYouPage = React.forwardRef((_, ref) => {
  const answersState = useSelector(getAnswers);

  if (!answersState.succeded) {
    return <Redirect to="/" />;
  }

  return (
    <Panel ref={ref}>
      <IconPanel title="Thank you">
        <InformationIcon></InformationIcon>{" "}
      </IconPanel>
    </Panel>
  );
});

export default ThankYouPage;
