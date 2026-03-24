import Markdown from "react-markdown";

export default function Option({
  option,
  questionType,
  storeAnswers,
  selectedOptionId,
  questionNumber,
  textFormatter,
  onEnter,
}) {
  const loweredQuestionType = questionType.toLowerCase();

  switch (loweredQuestionType) {
    case "tf":
      return (
        <div className="mt-2 ml-2">
          <input
            type="radio"
            id={option.id}
            value={option.id}
            name={`choice-${questionNumber}`}
            checked={selectedOptionId[0] === option.id}
            onChange={(e) => {
              storeAnswers(e.target.value, questionType);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("hi");
                // onEnter(questionNumber);
              }
            }}
          />
          <label htmlFor={option.id} className="answer-selection ml-1">
            <span className="label-text">{textFormatter(option.label)}</span>
          </label>
        </div>
      );
    case "mcq":
      return (
        <div className="mt-2 ml-2">
          <input
            type="radio"
            id={option.id}
            value={option.id}
            name={`choice-${questionNumber}`}
            checked={selectedOptionId[0] === option.id}
            onChange={(e) => {
              storeAnswers(e.target.value, questionType);
            }}
          />
          <label
            htmlFor={option.id}
            className="answer-selection ml-1 text-left"
          >
            <span className="label-text">{textFormatter(option.label)}</span>
          </label>
        </div>
      );
    case "short_answer":
      return (
        <div className="exam-page:w-3/4 my-2 flex w-full flex-col justify-center">
          <input
            key={questionNumber}
            type="text"
            id={option.id}
            defaultValue={selectedOptionId[0] ?? ""}
            onChange={(e) => {
              storeAnswers(e.target.value, questionType);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEnter(questionNumber);
              }
            }}
          />
          <label htmlFor={option.id} className="text-input ml-1">
            <span className="label-text">{textFormatter(option.label)}</span>
          </label>
        </div>
      );
    case "long_answer":
      return (
        <div className="my-2 flex w-full flex-col justify-center">
          <textarea
            key={questionNumber}
            id={option.id}
            rows={4}
            defaultValue={selectedOptionId[0] ?? ""}
            onChange={(e) => {
              storeAnswers(e.target.value, questionType);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEnter(questionNumber);
              }
            }}
          />
          <label htmlFor={option.id} className="text-input ml-1">
            <span className="label-text">{textFormatter(option.label)}</span>
          </label>
        </div>
      );
  }
}
