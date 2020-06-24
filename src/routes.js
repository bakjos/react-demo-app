import React, { useCallback, useRef } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import QuestionPage from "./containers/questionPage";
import ThankYouPage from "./containers/thankyouPage";

const Wrapper = styled.div`
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

  width: 100vw;
  height: 100vh;
  display: flex;
`;

function Container({ location }) {
  const childRefs = useRef({});

  const getOrCreateChildRef = useCallback((id) => {
    if (!childRefs.current[id]) {
      childRefs.current[id] = React.createRef();
    }
    return childRefs.current[id];
  }, []);

  return (
    <Wrapper>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames={"fade"}
          timeout={{ enter: 600, exit: 600 }}
          nodeRef={getOrCreateChildRef(location.key)}
        >
          <Switch location={location}>
            <Route path="/thank-you">
              <ThankYouPage ref={getOrCreateChildRef(location.key)} />
            </Route>
            <Route path="/">
              <QuestionPage ref={getOrCreateChildRef(location.key)} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
  );
}

export default withRouter(Container);
