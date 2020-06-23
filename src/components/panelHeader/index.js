import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.h1`
  text-align: center;
  font-size: ${(props) => props.theme.titleSize};
  color: ${(props) => props.theme.primaryColor};
  margin: 15px 5px 0;
`;

const SubHeader = styled.h2`
  text-align: center;
  margin: 5px;
  color: ${(props) => props.theme.secondaryColor};
  font-size: ${(props) => props.theme.subtitleSize};
`;

const PanelHeader = ({ title, subtitle, className }) => {
  return (
    <section className={className}>
      <Header>{title}</Header>
      <SubHeader>{subtitle}</SubHeader>
    </section>
  );
};

PanelHeader.defaultProps = {
  subtitle: "",
};

PanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default React.memo(styled(PanelHeader)``);
