// import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

export default function ResultNavigationBar({
  exam,
  storedAnswers,
  flagData,
  showScore,
  onBackToSelection,
}) {
  const questions = Object.entries(exam.questions);
  const [isWide, setWide] = useState(window.innerWidth > 1150);
  const updateMedia = () => {
    setWide(window.innerWidth > 1150);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const wideScreenNavBar = () => {
    return (
      <div className="flex h-full w-full flex-col gap-3">
        <p className="flex w-full justify-center border-b-4 border-dashed border-[#2a3543] pb-4 text-3xl font-bold">
          Navigation
        </p>
        <div className="flex h-5/6 flex-col items-start overflow-y-auto rounded-lg border-2 border-[#2a3543] bg-[#1d2025] p-8 pt-0">
          <div className="mt-6 flex w-full">
            <div className="flex-1">
              <div className="flex flex-col items-start gap-4 overflow-y-auto">
                {questions.map(([questionId, questionData]) => {
                  const correctOption = [
                    ...questionData.correctOptionIds,
                  ].sort();
                  const userAnswer = [
                    ...(storedAnswers[questionId] ?? []),
                  ].sort();
                  const isCorrect =
                    userAnswer.length === correctOption.length &&
                    userAnswer.every((v, i) => v === correctOption[i]);

                  const primaryColor = isCorrect ? "#4caf8a" : "#d05c5c";
                  const questionNumber = parseInt(questionId.slice(1), 10);

                  return (
                    <div
                      className="flex flex-row justify-between gap-2 self-stretch"
                      key={`navQuestion${questionNumber}`}
                    >
                      <label
                        htmlFor={`questionButtonExam${questionNumber}`}
                        className="text-left text-lg transition-all duration-300 hover:text-blue-300"
                      >
                        Question {questionNumber}
                      </label>
                      <button
                        onClick={() => setCurrentQuestionNumber(questionNumber)}
                        id={`questionButtonExam${questionNumber}`}
                        style={{ "--primary": primaryColor }}
                        className={`aspect-square w-7 rounded-full border-2 border-(--primary) bg-(--primary) transition-all duration-300`}
                      ></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="w-full rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onBackToSelection}
          >
            Exam Selection
          </button>
        </div>
      </div>
    );
  };

  const nonWideScreenNavBar = () => {
    return (
      <div className="flex h-full w-full flex-row gap-3">
        <div className="flex w-5/6 flex-row items-center overflow-x-auto rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-5">
          {/* <p className="">Navigation</p> */}
          <div>
            <div>
              <div className="flex flex-row gap-3">
                {questions.map(([questionId, questionData]) => {
                  const correctOption = [
                    ...questionData.correctOptionIds,
                  ].sort();
                  const userAnswer = [
                    ...(storedAnswers[questionId] ?? []),
                  ].sort();
                  const isCorrect =
                    userAnswer.length === correctOption.length &&
                    userAnswer.every((v, i) => v === correctOption[i]);

                  const questionNumber = parseInt(questionId.slice(1), 10);
                  // const isFlagged = !!flagData[`q${questionNumber}`];
                  // const primaryBorder = isFlagged
                  //   ? "border-[#df8342]"
                  //   : "border-[#2462b2]";

                  const bgClass = !showScore
                    ? "bg-[#2462b2]"
                    : isCorrect
                      ? "bg-[#4caf8a]"
                      : "bg-[#d05c5c]";

                  return (
                    <div
                      className="flex flex-col items-center gap-1"
                      key={`navQuestion${questionNumber}`}
                    >
                      <label
                        htmlFor={`questionButtonResult${questionNumber}`}
                        className="text-center text-base transition-all duration-300 hover:text-blue-300"
                      >
                        {questionNumber}
                      </label>
                      <button
                        className={`aspect-square w-6 rounded-full ${bgClass}`}
                        id={`questionButtonResult${questionNumber}`}
                      ></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col">
          <button
            className="flex-1 rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-3 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onBackToSelection}
          >
            Back to Selection
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-hidden">
      {isWide ? wideScreenNavBar() : nonWideScreenNavBar()}
    </div>
  );
}
