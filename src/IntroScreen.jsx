import "./App.css";

export default function IntroScreen({
  currentExam,
  onStartExam,
  onBackToSelection,
}) {
  return (
    <div className="relative flex h-dvh w-full flex-col">
      <header className="header">
        <h1 className="text-xl font-bold">{currentExam.info.set_name}</h1>
      </header>
      <section className="max-intro-page:text-left mx-auto mt-10 flex w-5/6 flex-col items-center justify-center px-5 pt-0">
        <h1 className="text-center text-4xl font-bold">
          Problem Set Information
        </h1>
        <div className="mt-5 flex flex-col gap-1">
          <p>Exam title: {currentExam.info.set_name}</p>
          <p>
            This exam has {Object.keys(currentExam.questions).length} questions.
          </p>
          <p>
            Description:{" "}
            {currentExam.info.description !== ""
              ? currentExam.info.description
              : "No description has been added yet; this exam set has likely not undergone a quality check."}
          </p>
          <p>References: {currentExam.info.source}</p>
        </div>
        <div className="intro-page:w-3/4 mt-5 flex w-full flex-col gap-3 md:w-2/5 md:flex-row">
          <button
            className="flex-1 rounded-lg border-4 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onStartExam}
          >
            Start Exam
          </button>
          <button
            className="flex-1 rounded-lg border-4 border-[#2a3543] bg-[#1d2025] px-4 py-2 transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
            onClick={onBackToSelection}
          >
            Back to Selection
          </button>
        </div>
      </section>
    </div>
  );
}
