import Option from "./Option";

export default function OptionsRenderer({
  question,
  storeAnswers,
  selectedOptionId,
  questionNumber,
  textFormatter,
  onEnter,
}) {
  const options = question["options"];
  return (
    <div className="mt-2 flex h-full w-full flex-col items-start justify-center">
      {options.map(({ id, label }) => (
        <Option
          key={id}
          option={{ id, label }}
          questionType={question["type"]}
          storeAnswers={storeAnswers}
          selectedOptionId={selectedOptionId}
          questionNumber={questionNumber}
          textFormatter={textFormatter}
          onEnter={onEnter}
        />
      ))}
    </div>
  );
}
