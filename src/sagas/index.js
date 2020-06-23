import {
  takeEvery,
  delay,
  put,
  call,
  fork,
  select,
  all,
  takeLatest,
} from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";
import { getAnswerMap, getQuestions } from "../reducers";

export function* getAllQuestions() {
  const questions = yield call(api.getQuestions);
  yield delay(2000);
  yield put(actions.receiveQuestions(questions));
}

export function* validateAnswers() {
  const answersMap = yield select(getAnswerMap);
  const questions = yield select(getQuestions);
  if (questions.items && questions.items.length > 0) {
    const missing = questions.items
      .filter((q) => !answersMap[q.id])
      .map((q) => q.id);
    yield put({ type: actions.VALIDATED, payload: missing });
  }
}

export function* postAnswers() {
  const answersMap = yield select(getAnswerMap);
  const response = yield call(api.postAnswers, answersMap);
  yield delay(1500);
  yield put({ type: actions.RECEIVE_ANSWERS_ACK, payload: response });
}

export function* watchGetQuestions() {
  yield takeLatest(actions.GET_ALL_QUESTIONS, getAllQuestions);
}

export function* watchPostAnswers() {
  yield takeEvery(actions.POST_ANSWERS, postAnswers);
}

export function* watchSetAnswer() {
  yield takeEvery(actions.SET_ANSWER, validateAnswers);
}

export default function* root() {
  yield all([
    fork(watchGetQuestions),
    fork(watchSetAnswer),
    fork(watchPostAnswers),
  ]);
}
