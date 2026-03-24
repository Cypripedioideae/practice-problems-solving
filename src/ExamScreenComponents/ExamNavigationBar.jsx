import { useState, useEffect } from "react";

export default function ExamNavigationBar({
  exam,
  flagData,
  currentQuestionNumber,
  setCurrentQuestionNumber,
  answerStates,
  onBackToIntro,
  onNavigateToResult,
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
                {questions.map((question) => {
                  const questionNumber = parseInt(question[0].slice(1), 10);
                  const isActive = questionNumber === currentQuestionNumber;
                  const isFlagged = !!flagData[`q${questionNumber}`];
                  const primaryColor = isFlagged ? "#df8342" : "#2462b2";
                  const haveAnswer =
                    (answerStates[`q${questionNumber}`] ?? []).length > 0;
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
                        className={`aspect-square ${isActive ? "w-8" : "w-7"} rounded-full border-2 border-(--primary) transition-all duration-300 ${haveAnswer ? "bg-(--primary)" : "bg-transparent hover:bg-(--primary)/30"}`}
                      ></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-3">
          <button
            className="rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onBackToIntro}
          >
            Back to intro
          </button>
          <button
            className="rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onNavigateToResult}
          >
            Submit
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
                {questions.map((question) => {
                  const questionNumber = parseInt(question[0].slice(1), 10);
                  const isActive = questionNumber === currentQuestionNumber;
                  const isFlagged = !!flagData[`q${questionNumber}`];
                  const primaryBg = isFlagged ? "bg-[#df8342]" : "bg-[#2462b2]";
                  const primaryBorder = isFlagged
                    ? "border-[#df8342]"
                    : "border-[#2462b2]";
                  const bgClass = isActive ? primaryBg : "bg-transparent";
                  const borderClass = primaryBorder;
                  const primaryColor = isFlagged ? "#df8342" : "#2462b2";
                  const haveAnswer =
                    (answerStates[`q${questionNumber}`] ?? []).length > 0;

                  return (
                    <div
                      className="flex flex-col items-center gap-1"
                      key={`navQuestion${questionNumber}`}
                    >
                      <label
                        htmlFor={`questionButtonExam${questionNumber}`}
                        className="text-center text-base transition-all duration-300 hover:text-blue-300"
                      >
                        {questionNumber}
                      </label>
                      <button
                        onClick={() => setCurrentQuestionNumber(questionNumber)}
                        id={`questionButtonExam${questionNumber}`}
                        style={{ "--primary": primaryColor }}
                        className={`aspect-square ${isActive ? "w-8 " : "w-7"} rounded-full border-2 border-(--primary) transition-all duration-300 ${haveAnswer ? "bg-(--primary)" : "bg-transparent hover:bg-(--primary)/30"}`}
                      ></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col gap-3">
          <button
            className="flex-1 rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-3 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onBackToIntro}
          >
            Intro
          </button>
          <button
            className="flex-1 rounded-lg border-2 border-[#2a3543] bg-[#1d2025] px-3 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onNavigateToResult}
          >
            Submit
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
