import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useToast } from ".";

const Wrapper = styled.div`
  margin-right: 16px;
  margin-top: 16px;
  width: 200px;
  position: relative;
  padding: 16px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  background: white;
  color: #494e5c;
  right: -300px;
  transform: translateX(
    ${({ state }) => (state === "entering" || state === "exiting" ? 0 : -300)}px
  );
  transition: 0.5s;
`;

const Toast = React.forwardRef(
  ({ children, id, state, timeout, onTimeout }, ref) => {
    const { removeToast } = useToast();

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!onTimeout || !onTimeout(id)) {
          removeToast(id);
        }
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }, [id, timeout, removeToast, onTimeout]);

    return (
      <Wrapper ref={ref} state={state}>
        {children}
      </Wrapper>
    );
  }
);

Toast.defaultProps = {
  timeout: 3000,
};

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  timeout: PropTypes.number,
  state: PropTypes.string,
  onTimeout: PropTypes.func,
};

export default Toast;
