export default function SolutionsRenderer({
  questions,
  storedAnswers,
  showScore,
  textFormatter,
}) {
  const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  return (
    <div>
      {questions.map(([questionId, questionData]) => {
        const userAnswer = [...(storedAnswers[questionId] ?? [])].sort();
        const questionNumber = questionId.slice(1);
        const correctOption = [...questionData.correctOptionIds].sort();
        const isCorrect =
          userAnswer.length === correctOption.length &&
          userAnswer.every((v, i) => v === correctOption[i]);
        const questionType = questionData.type.toLowerCase();
        const indexFromOption = (answer) =>
          ({
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            e: 4,
          })[answer];

        const renderAnsweredQuestion = () => {
          if (userAnswer.length === 0) {
            return "Not Answered";
          }

          if (questionType === "mcq") {
            const option = questionData.options[indexFromOption(userAnswer[0])];
            return option?.label;
          }
          if (questionType === "tf") {
            /* only cast cap() on questions with TF format */
            const outputAnswer = userAnswer.map(cap);
            return outputAnswer.join(", ");
          }
          return userAnswer.join(", ");
        };

        const renderCorrectQuestion = () => {
          if (correctOption.length === 0) {
            return "-";
          }

          if (questionType === "mcq") {
            const option =
              questionData.options[indexFromOption(correctOption[0])];
            return option?.label;
          }

          if (questionType === "tf") {
            /* only cast cap() on questions with TF format */
            const outputCorrectOption = correctOption.map(cap);
            return outputCorrectOption.join(", ");
          }
          return correctOption.join(", ");
        };

        return (
          <div
            key={questionId}
            className="mt-3 flex w-full flex-col items-start justify-start gap-2 rounded-xl border-4 border-[#2a3543] bg-[#1d2025] p-8"
          >
            <div className="flex w-full flex-row justify-between text-2xl font-bold">
              <h1>Question {questionNumber}</h1>
              <h1>{showScore ? <>{isCorrect ? "1/1" : "0/1"}</> : null}</h1>
            </div>
            <div className="text-start">
              {textFormatter(questionData.prompt)}
            </div>
            <div className="text-start">
              Your answer:{" "}
              <span className="label-text font-bold">
                {textFormatter(renderAnsweredQuestion())}
              </span>
            </div>
            <div className="text-start">
              Correct answer:{" "}
              <span className="label-text font-bold">
                {textFormatter(renderCorrectQuestion())}
              </span>
            </div>
            <div className="flex flex-col gap-2 text-start">
              <u>Explanation</u>
              <span className="label-text ml-4">
                {textFormatter(questionData.answerDescription ?? "None")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
