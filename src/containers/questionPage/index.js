import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../actions";
import Answers from "../../components/answers";
import ErrorPanel from "../../components/iconPanel/errorPanel";
import LoadingPanel from "../../components/iconPanel/loadingPanel";
import Panel from "../../components/panel";
import PanelHeader from "../../components/panelHeader";
import Progress from "../../components/progress";
import StyledButton from "../../components/styledButton";
import { useToast } from "../../components/toast";
import withAnimation from "../../hocs/withAnimation";
import { getAnswers, getQuestions } from "../../reducers";

const QuestionTitle = withAnimation(styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 17px;
  margin: 30px 0px;

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
`);

const ButtonsSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 15px;
`;

const QuestionPage = React.forwardRef((_, ref) => {
  const questions = useSelector(getQuestions);
  const answersState = useSelector(getAnswers);
  const { addToast } = useToast();

  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);

  const currentQuestion =
    questions.items && questions.items.length > currentStep
      ? questions.items[currentStep]
      : {};

  const answers = currentQuestion.answers ? currentQuestion.answers : [];

  const answerMap = answersState?.answerMap || {};

  useEffect(() => {
    dispatch(actions.getAllQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (answersState.error) {
      addToast(answersState.error);
    }
  }, [addToast, answersState.error]);

  const onSelectedAnswer = useCallback(
    (id) => {
      let answerMap = {};
      answerMap[currentQuestion.id] = parseInt(id);
      dispatch(actions.setAnswer(answerMap));
    },
    [currentQuestion.id, dispatch]
  );

  const previousStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (answersState.validated && currentStep === questions.items.length - 1) {
      dispatch(actions.postAnswers());
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [dispatch, answersState.validated, currentStep, questions.items]);

  if (answersState.succeded) {
    return <Redirect to="/thank-you" />;
  }

  console.log("Rendering");

  return (
    <Panel ref={ref}>
      {!questions.items || questions.loading || questions.error ? (
        <>
          {questions.error ? (
            <ErrorPanel title={questions.error} />
          ) : (
            <LoadingPanel title="Loading" />
          )}
        </>
      ) : (
        <>
          <PanelHeader
            title="Question Wizard"
            subtitle={currentQuestion.subtitle}
          />
          <Progress
            steps={questions.items.length}
            currentStep={currentStep}
            onItemClick={(step) => setCurrentStep(step)}
          ></Progress>
          <QuestionTitle
            animationTimeout={250}
            animationClasses="fade"
            refKey={`title-${currentQuestion.id}`}
          >
            {currentQuestion.text}
          </QuestionTitle>
          <Answers
            refKey={currentQuestion.id}
            animationClasses="fade"
            animationTimeout={250}
            answers={answers}
            onAnswerSelected={onSelectedAnswer}
            selectedAnswer={answerMap[currentQuestion.id]}
          />
          <ButtonsSection>
            <StyledButton onClick={previousStep} visible={currentStep > 0}>
              Previous
            </StyledButton>
            <StyledButton
              onClick={nextStep}
              disabled={
                (currentStep === questions.items.length - 1 &&
                  !answersState.validated) ||
                !answerMap[currentQuestion.id]
              }
            >
              {currentStep === questions.items.length - 1 ? "Finish" : "Next"}{" "}
            </StyledButton>
          </ButtonsSection>
          {answersState.loading && (
            <LoadingPanel
              customBackground="rgba(255, 255, 255, 0.5)"
              title="Posting Quesions"
            />
          )}
        </>
      )}
    </Panel>
  );
});

export default QuestionPage;
