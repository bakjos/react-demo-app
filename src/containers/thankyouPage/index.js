import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import IconPanel from "../../components/iconPanel";
import Panel from "../../components/panel";
import { getAnswers } from "../../reducers";

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
