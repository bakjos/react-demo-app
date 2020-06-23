import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  background-color: white;
  visibility: ${({ visible }) => (visible === true ? "visible" : "hidden")};
  color: ${({ theme }) => theme.primaryColor};
  border: 1px solid ${({ theme }) => theme.buttonBackgroud};
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  outline: none;
  transition: 0.5s;
  text-align: center;
  max-width: 150px;

  &:hover:not([disabled]) {
    color: white;
    background-color: ${({ theme }) => theme.buttonBackgroud};
  }

  &[disabled] {
    cursor: default;
    border: 1px solid ${({ theme }) => theme.primaryColor};
  }
`;

StyledButton.defaultProps = {
  visible: true,
};

StyledButton.propTypes = {
  visible: PropTypes.bool,
};

export default StyledButton;
