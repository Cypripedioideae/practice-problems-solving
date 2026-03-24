import { useState } from "react";
import Exams from "./Exams";

export default function DropDownSelection({
  examTopicTitle,
  examTopicCaller,
  onSelection,
  toggleState,
  setToggleState,
}) {
  const onClick = () => {
    toggleState === examTopicCaller
      ? setToggleState(null)
      : setToggleState(examTopicCaller);
  };

  // https://www.youtube.com/watch?v=8V0djEq16zI

  return (
    <div className="flex w-full flex-col items-start">
      <button
        className="selection-page:text-3xl mb-2 w-full text-left text-xl transition-all duration-300 hover:text-blue-300"
        onClick={onClick}
      >
        {examTopicTitle}
      </button>
      <div>
        {toggleState === examTopicCaller ? (
          <Exams topicName={examTopicCaller} onSelection={onSelection} />
        ) : null}
      </div>
    </div>
  );
}
