import "./App.css";
import SolutionsRenderer from "./ResultScreenComponents/SolutionsRenderer";
import ResultNavigationBar from "./ResultScreenComponents/ResultNavigationBar";

export default function ResultScreen({
  currentExam,
  answerStates,
  flagData,
  onBackToSelection,
}) {
  const questions = Object.entries(currentExam.questions);
  const storedAnswers = { ...answerStates };
  const questionAmount = questions.length;

  var showScore = true;
  for (let i = 0; i < questions.length; i++) {
    if (
      questions.some(
        (questionData) => questionData[1]["type"] === "short_answer",
      ) ||
      questions.some(
        (questionData) => questionData[1]["type"] === "long_answer",
      )
    ) {
      showScore = false;
      break;
    }
  }

  const calculateScore = (rawUserAnswers, questions) => {
    const userAnswers = Object.entries(rawUserAnswers);
    console.log(`Array of user answers: ${userAnswers}`);
    let score = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      const userAnswer = [...userAnswers[i][1]].sort();
      const currentQuestionIndex = userAnswers[i][0].slice(1);
      const correctOption = [
        ...questions[currentQuestionIndex - 1][1]["correctOptionIds"],
      ].sort();
      const isCorrect =
        userAnswer.length === correctOption.length &&
        userAnswer.every((v, i) => v === correctOption[i]);
      console.log(
        `User answer for question ${currentQuestionIndex}: ${userAnswer}`,
      );
      console.log(
        `Correct option for question ${currentQuestionIndex}: ${correctOption}`,
      );
      console.log(
        `Correctness of question ${currentQuestionIndex}: ${isCorrect}`,
      );
      console.log("---");
      if (isCorrect) {
        score += 1;
      }
    }
    return score;
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

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <header className="header">
        <h1 className="text-xl font-bold">
          {currentExam.info.set_name} Result
        </h1>
      </header>
      <section className="exam-page:flex-row flex flex-1 flex-col items-stretch overflow-hidden">
        <section className="flex h-full flex-col items-start overflow-y-auto p-10 pt-6">
          <h1 className="w-full text-center text-3xl font-bold">
            {showScore ? (
              <>
                Your Score: {calculateScore(storedAnswers, questions)}/
                {questionAmount}
              </>
            ) : null}
          </h1>
          <div className="mt-3 flex w-full flex-col items-start justify-start">
            <SolutionsRenderer
              questions={questions}
              storedAnswers={storedAnswers}
              showScore={showScore}
              textFormatter={renderFormattedText}
            />
          </div>
        </section>
        <nav className="nav-bar z-40 flex p-5">
          <ResultNavigationBar
            exam={currentExam}
            storedAnswers={storedAnswers}
            flagData={flagData}
            showScore={showScore}
            onBackToSelection={onBackToSelection}
          />
        </nav>
      </section>
    </div>
  );
}
