import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import withAnimation from "../../hocs/withAnimation";

const RadioGroup = styled.div`
  min-height: 200px;

  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 600ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 600ms ease-in;
  }
`;

const FormFieldGroup = styled.div`
  margin: 15px 30px;
  position: relative;
`;

const RadioButton = styled.input.attrs({
  type: "radio",
})`
  width: 0;
  height: 0;
`;

const EmptyIcon = styled(FontAwesomeIcon).attrs({
  icon: faCircle,
})`
  color: ${(props) => props.theme.primaryColor};
`;

const CheckedIcon = styled(FontAwesomeIcon).attrs({
  icon: faDotCircle,
})`
  color: ${(props) => props.theme.primaryColor};
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
  border-radius: 15px;
  background-color: ${(props) => props.theme.lightColor};
  min-height: 30px;
  line-height: 28px;
  padding-left: 15px;

  &:hover {
    background-color: ${(props) => props.theme.secondaryColor};
  }
  & ${EmptyIcon} {
    display: initial;
  }
  
  & ${CheckedIcon} {
    display: none;
  }

  ${RadioButton}:checked + & ${EmptyIcon} {
    display: none;
  }

  ${RadioButton}:checked + & ${CheckedIcon} {
    display: initial;
  }
`;

const RadioButtonWrapper = ({ answer, selectedAnswer, onAnswerSelected }) => {
  let additionalProps = {};

  if (onAnswerSelected !== undefined) {
    additionalProps = {
      ...additionalProps,
      onChange: (e) => {
        if (onAnswerSelected) {
          onAnswerSelected(e.target.value);
        }
      },
    };
  }

  if (selectedAnswer !== undefined || onAnswerSelected !== undefined) {
    additionalProps = {
      ...additionalProps,
      checked: answer.id === selectedAnswer,
    };
  }

  return (
    <RadioButton
      id={answer.id}
      name="answers"
      value={answer.id}
      {...additionalProps}
    />
  );
};

const Answers = React.forwardRef(
  ({ answers, onAnswerSelected, selectedAnswer }, ref) => {
    return (
      <RadioGroup ref={ref}>
        {answers.map((a) => (
          <FormFieldGroup key={a.id}>
            <RadioButtonWrapper
              answer={a}
              selectedAnswer={selectedAnswer}
              onAnswerSelected={onAnswerSelected}
            />
            <Label htmlFor={a.id}>
              <CheckedIcon /> <EmptyIcon /> {a.text}
            </Label>
          </FormFieldGroup>
        ))}
      </RadioGroup>
    );
  }
);

Answers.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAnswerSelected: PropTypes.func,
  selectedAnswer: PropTypes.number,
};

export default React.memo(withAnimation(Answers));
