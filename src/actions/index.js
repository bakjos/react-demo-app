export const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SET_ANSWER = "SET_ANSWER";
export const VALIDATE_ANSWERS = "VALIDATE_ANSWERS";
export const VALIDATED = "VALIDATED";
export const POST_ANSWERS = "POST_ANSWERS";
export const RECEIVE_ANSWERS_ACK = "RECEIVE_ANSWERS_ACK";

export const getAllQuestions = () => {
  return {
    type: GET_ALL_QUESTIONS,
  };
};

export const postAnswers = () => {
  return {
    type: POST_ANSWERS,
  };
};

export const setAnswer = (answerMap) => {
  return { type: SET_ANSWER, payload: answerMap };
};

export const receiveQuestions = (questions) => {
  return { type: RECEIVE_QUESTIONS, payload: questions };
};
