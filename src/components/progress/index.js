import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
  position: relative;
`;

const ProgressWrapper = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 5px 25px;
`;

const StatusBar = styled.div`
  height: 4px;
  background-color: ${(props) => props.theme.lightColor};
  position: absolute;
  top: 50%;
  top: calc(50% - 2px);
  width: 100%;
`;

const StatusBarProgress = styled.div`
  height: 4px;
  background-color: ${(props) => props.theme.buttonBackgroud};
  width: calc(
    ${(props) => props.percentage}%
      ${(props) => (props.percentage > 50 ? "-" : "+")}
      ${(props) => props.increment}px
  );
  transition: width 0.5s;
`;

const ProgressItem = styled.li`
  background-color: ${(props) =>
    props.selected ? props.theme.buttonBackgroud : "white"};
  color: ${(props) => (props.selected ? "white" : props.theme.primaryColor)};
  display: inline-block;
  border: solid 4px ${(props) => props.theme.buttonBackgroud};
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  line-height: 47px;
  font-size: 22px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
`;

const Progress = ({ steps, currentStep, onItemClick }) => {
  const items = [...Array(steps).keys()];
  let percentage = parseInt((currentStep / (steps - 1)) * 100);
  let increment = 25;

  return (
    <Section>
      <StatusBar>
        <StatusBarProgress percentage={percentage} increment={increment} />
      </StatusBar>
      <ProgressWrapper>
        {items.map((item) => (
          <ProgressItem
            selected={item <= currentStep - 1}
            key={item}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item);
              }
            }}
          >
            {item + 1}
          </ProgressItem>
        ))}
      </ProgressWrapper>
    </Section>
  );
};

Progress.propTypes = {
  steps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
};

export default React.memo(Progress);
