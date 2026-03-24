import { useState } from "react";
import "./App.css";
import OptionsRenderer from "./ExamScreenComponents/OptionsRenderer";
import ExamNavigationBar from "./ExamScreenComponents/ExamNavigationBar";

export default function ExamScreen({
  currentExam,
  answerStates,
  setAnswerStates,
  flaggedStates,
  onBackToIntro,
  onNavigateToResult,
}) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const questionSetLength = Object.keys(currentExam.questions).length;
  const { flagged, setFlagged } = flaggedStates;
  const containPersistentInformation = !!currentExam.info.persistentInformation;

  const increaseQuestionNumber = (questionNumber) => {
    if (questionNumber >= questionSetLength) return;
    setCurrentQuestionNumber(questionNumber + 1);
  };

  const decreaseQuestionNumber = (questionNumber) => {
    if (questionNumber <= 1) return;
    setCurrentQuestionNumber(questionNumber - 1);
  };

  const storeAnswers = (newAnswer, questionType) => {
    const key = `q${currentQuestionNumber}`;

    const loweredQuestionType = questionType.toLowerCase();
    switch (loweredQuestionType) {
      case "tf":
        setAnswerStates((prev) => {
          return {
            ...prev,
            [key]: [newAnswer],
          };
        });
        break;
      case "short_answer":
        setAnswerStates((prev) => {
          return {
            ...prev,
            [key]: [newAnswer],
          };
        });
        break;
      case "mcq":
        setAnswerStates((prev) => {
          return {
            ...prev,
            [key]: [newAnswer],
          };
        });
        break;
      case "long_answer":
        setAnswerStates((prev) => {
          return {
            ...prev,
            [key]: [newAnswer],
          };
        });
        break;
      default:
        throw new Error(`Unhandled question type: ${questionType}`);
    }
  };

  const renderFormattedText = (text) => {
    const regex = /(\*(.*?)\*|\^\((.*?)\)|_\((.*?)\)|\^(.)|_(.))/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      if (match[2] !== undefined) {
        parts.push(<i key={key++}>{match[2]}</i>);
      } else if (match[3] !== undefined) {
        parts.push(<sup key={key++}>{match[3]}</sup>);
      } else if (match[4] !== undefined) {
        parts.push(<sub key={key++}>{match[4]}</sub>);
      } else if (match[5] !== undefined) {
        parts.push(<sup key={key++}>{match[5]}</sup>);
      } else if (match[6] !== undefined) {
        parts.push(<sub key={key++}>{match[6]}</sub>);
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const setFlaggedState = (flaggedBool, questionNumber) => {
    const key = `q${questionNumber}`;
    setFlagged((prev) => {
      return {
        ...prev,
        [key]: flaggedBool,
      };
    });
  };

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <header className="header">
        <h1 className="text-xl font-bold">{currentExam.info.set_name}</h1>
      </header>
      <section className="exam-page:flex-row flex flex-1 flex-col items-stretch overflow-hidden">
        <section className="flex h-full flex-1 flex-col overflow-y-auto p-10">
          <div className="relative flex w-full flex-col items-start justify-start rounded-xl bg-[#1d2025] p-8">
            <input
              type="checkbox"
              id="flag"
              className="peer hidden"
              checked={flagged[`q${currentQuestionNumber}`] ?? false}
              onChange={(e) => {
                setFlaggedState(e.target.checked, currentQuestionNumber);
              }}
            />
            <label
              htmlFor="flag"
              className="flag group absolute top-0 right-0 aspect-square w-[clamp(32px,10%,64px)] cursor-pointer"
            />
            <div className="pointer-events-none absolute inset-0 z-10 border-4 border-[#262b33]" />
            <div className="pointer-events-none absolute inset-0 z-20 rounded-xl border-4 border-[#2a3543]" />
            {containPersistentInformation ? (
              <>
                <h1 className="text-3xl font-bold">Case</h1>
                <div className="mt-3 mb-5 text-left whitespace-pre-wrap">
                  {currentExam.info.persistentInformation}
                </div>
              </>
            ) : null}
            <h1
              className={`${containPersistentInformation ? "text-xl" : "text-3xl "} font-bold`}
            >
              Question {currentQuestionNumber}
            </h1>
            <div className="mt-3 text-left">
              {containPersistentInformation ? (
                <span className="whitespace-pre-wrap">{"\t"}</span>
              ) : null}
              <span className="label-text">
                {renderFormattedText(
                  currentExam.questions[`q${currentQuestionNumber}`]["prompt"],
                )}
              </span>
            </div>
            <OptionsRenderer
              question={currentExam.questions[`q${currentQuestionNumber}`]}
              storeAnswers={storeAnswers}
              selectedOptionId={
                answerStates[`q${currentQuestionNumber}`] ?? []
              } /* not viable at the moment to accept multiple selections */
              questionNumber={currentQuestionNumber}
              textFormatter={renderFormattedText}
              onEnter={increaseQuestionNumber}
            />
          </div>
          <div className="mt-5 flex w-full items-start justify-between gap-5">
            <button
              className="flex-1 rounded-lg border-4 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
              onClick={() => {
                decreaseQuestionNumber(currentQuestionNumber);
              }}
            >
              Previous
            </button>
            <button
              className="flex-1 rounded-lg border-4 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
              onClick={() => {
                increaseQuestionNumber(currentQuestionNumber);
              }}
            >
              Next
            </button>
          </div>
        </section>
        <nav className="nav-bar z-40 flex p-5">
          <ExamNavigationBar
            exam={currentExam}
            flagData={flagged}
            currentQuestionNumber={currentQuestionNumber}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
            answerStates={answerStates}
            onBackToIntro={onBackToIntro}
            onNavigateToResult={onNavigateToResult}
          />
        </nav>
      </section>
    </div>
  );
}
