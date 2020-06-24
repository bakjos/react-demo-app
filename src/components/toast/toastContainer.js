import React, { useCallback, useContext, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import { ToastContext } from ".";
import Toast from "./toast";

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const ToastContainer = ({ toasts }) => {
  const childRefs = useRef({});
  const { removeToast } = useContext(ToastContext);

  const forceUpdate = useReducer(() => ({}), {})[1];

  const getOrCreateChildRef = useCallback((id) => {
    if (!childRefs.current[id]) {
      childRefs.current[id] = {
        ref: React.createRef(),
        exited: false,
      };
    }
    return childRefs.current[id];
  }, []);

  return createPortal(
    <Wrapper>
      {toasts.map((item) => (
        <Transition
          key={item.id}
          in={!getOrCreateChildRef(item.id).exited}
          appear={true}
          nodeRef={getOrCreateChildRef(item.id).ref}
          timeout={500}
          onExited={() => {
            removeToast(item.id);
          }}
        >
          {(state) => (
            <Toast
              key={item.id}
              id={item.id}
              timeout={item.timeout}
              state={state}
              ref={getOrCreateChildRef(item.id).ref}
              onTimeout={(id) => {
                getOrCreateChildRef(id).exited = true;
                forceUpdate();
                return true;
              }}
            >
              {item.content}
            </Toast>
          )}
        </Transition>
      ))}
    </Wrapper>,
    document.body
  );
};

export default ToastContainer;
