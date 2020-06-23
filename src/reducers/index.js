import { combineReducers } from "redux";
import * as actions from "../actions";

export const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_ALL_QUESTIONS:
      return {
        ...state,
        loading: true,
        items: [],
      };
    case actions.RECEIVE_QUESTIONS:
      const payload = action.payload;
      return {
        ...state,
        loading: false,
        items: payload.response?.questions || [],
        error: payload.error,
      };

    default:
      return state;
  }
};

export const answersReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_ANSWER:
      const currentMap = state.answerMap || {};
      const answerMap = {
        ...currentMap,
        ...action.payload,
      };

      return {
        ...state,
        answerMap: answerMap,
      };
    case actions.VALIDATED:
      return {
        ...state,
        missing: action.payload,
        validated: action.payload.length === 0,
      };
    case actions.POST_ANSWERS:
      return {
        ...state,
        error: undefined,
        loading: true,
        succeded: false,
      };

    case actions.RECEIVE_ANSWERS_ACK:
      return {
        ...state,
        loading: false,
        succeded: !action.payload.error,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getQuestions = (state) => {
  return state.questions;
};

export const getAnswers = (state) => {
  return state.answers;
};

export const getAnswerMap = (state) => {
  return state.answers?.answerMap || {};
};

const rootReducer = combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
});

export default rootReducer;
