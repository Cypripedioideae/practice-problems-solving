import { useState } from "react";
import "./App.css";
import IntroScreen from "./IntroScreen";
import ExamScreen from "./ExamScreen";
import ExamSelection from "./ExamSelection";
import ResultScreen from "./ResultScreen";
import DisplayMessage from "./ExamSelectionComponents/DisplayMessage";

function App() {
  const [view, setView] = useState("selection");
  const [currentExam, setCurrentExam] = useState(null);
  const [answerStates, setAnswerStates] = useState({});
  const [flagged, setFlagged] = useState({});
  const [toggleState, setToggleState] = useState(null);
  const [topicToggleState, setTopicToggleState] = useState(null);
  const [aboutPageCaller, setAboutPageCaller] = useState(null);

  return (
    <div className="min-h-dvh w-full overflow-hidden bg-[#262b33] text-blue-100">
      {view === "selection" && (
        <ExamSelection
          onSelection={(exam) => {
            setView("intro");
            setCurrentExam(exam);
            setAnswerStates({});
            setFlagged({});
          }}
          onNavigateToAbout={(caller) => {
            setView("about");
            setAboutPageCaller(caller);
          }}
          topicSelectionPersistence={{
            toggleState,
            setToggleState,
            topicToggleState,
            setTopicToggleState,
          }}
        />
      )}
      {view === "about" && (
        <DisplayMessage
          topicCaller={aboutPageCaller}
          onBackToSelection={() => setView("selection")}
        />
      )}
      {view === "intro" && (
        <IntroScreen
          currentExam={currentExam}
          onStartExam={() => setView("exam")}
          onBackToSelection={() => setView("selection")}
        />
      )}
      {view === "exam" && (
        <ExamScreen
          currentExam={currentExam}
          answerStates={answerStates}
          setAnswerStates={setAnswerStates}
          flaggedStates={{ flagged, setFlagged }}
          onBackToIntro={() => setView("intro")}
          onNavigateToResult={() => setView("result")}
        />
      )}

      {view === "result" && (
        <ResultScreen
          currentExam={currentExam}
          answerStates={answerStates}
          flagData={flagged}
          onBackToSelection={() => setView("selection")}
        />
      )}
    </div>
  );
}

export default App;
