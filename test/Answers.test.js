import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import Answers from "../src/components/answers";

const answers = [
  { id: 0, text: "This is a test" },
  { id: 1, text: "This is another test" },
];

describe("Test answer controll", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders answers with out callbacks", () => {
    render(<Answers answers={answers} animationClasses="fade" refKey="1" />);

    fireEvent.click(screen.getByText("This is another test"));

    const option = screen.getAllByLabelText("This is another test")[0];

    expect(option.checked).toBeTruthy();
  });

  it("renders answers read only", () => {
    render(
      <Answers
        answers={answers}
        animationClasses="fade"
        refKey="2"
        selectedAnswer={0}
        onAnswerSelected={() => {}}
      />
    );

    fireEvent.click(screen.getByText("This is another test"));

    let option = screen.getAllByLabelText("This is a test")[0];

    expect(option.checked).toBeTruthy();

    option = screen.getAllByLabelText("This is another test")[0];

    expect(option.checked).toBeFalsy();
  });

  it("renders answers read with callback", () => {
    const TestingComponent = () => {
      const [answer, setAnswer] = useState(0);
      return (
        <Answers
          answers={answers}
          animationClasses="fade"
          refKey="3"
          selectedAnswer={answer}
          onAnswerSelected={(index) => setAnswer(parseInt(index))}
        />
      );
    };

    render(<TestingComponent />);

    let option = screen.getAllByLabelText("This is a test")[0];
    expect(option.checked).toBeTruthy();

    option = screen.getAllByLabelText("This is another test")[0];
    expect(option.checked).toBeFalsy();

    fireEvent.click(screen.getByText("This is another test"));

    option = screen.getAllByLabelText("This is a test")[0];
    expect(option.checked).toBeFalsy();

    option = screen.getAllByLabelText("This is another test")[0];
    expect(option.checked).toBeTruthy();
  });
});
