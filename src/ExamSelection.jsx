import "./App.css";
import DropDownSelection from "./ExamSelectionComponents/DropDownSelection";
import { useState, useEffect } from "react";

export default function ExamSelection({
  onSelection,
  topicSelectionPersistence,
  onNavigateToAbout,
}) {
  const { toggleState, setToggleState, topicToggleState, setTopicToggleState } =
    topicSelectionPersistence;

  const [isWide, setWide] = useState(window.innerWidth > 1310);
  const updateMedia = () => {
    setWide(window.innerWidth > 1310);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const wideDisplayMessage = (topicState) => {
    return (
      <button
        onClick={() => {
          onNavigateToAbout(topicState);
        }}
        className="selection-page:w-5/6 selection-page:p-4 selection-page:text-xl selection-page:self-center self-stretch rounded-xl border-4 border-[#2a3543] bg-[#1f232b] p-3 text-base transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
      >
        Info and links
      </button>
    );
  };

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <header className="header">
        <h1 className="text-xl font-bold">Exam</h1>
      </header>
      <section className="selection-page:flex-row max-selection-page:gap-5 mx-10 my-8 flex flex-1 flex-col items-stretch overflow-hidden">
        <section className="selection-page:w-1/3 flex w-full flex-none flex-col items-start gap-5 align-middle">
          <div className="selection-page:p-3 selection-page:pb-0 flex w-full flex-row items-center justify-between gap-5">
            <div>
              <h1 className="selection-page:text-5xl selection-page:mb-5 mb-2 text-left text-3xl font-bold">
                Selection
              </h1>
              <p className="selection-page:mb-3 text-left text-xl">
                Select the topic you wish to explore.
              </p>
            </div>
            {!isWide ? wideDisplayMessage(topicToggleState) : null}
          </div>
          <div className="flex w-full flex-none flex-col items-start gap-3 align-middle">
            <button
              className="selection-page:w-5/6 selection-page:p-8 selection-page:text-3xl w-full self-center rounded-xl border-4 border-[#2a3543] bg-[#1f232b] p-2 text-xl transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
              onClick={() => setTopicToggleState("microbiology")}
            >
              &#x1F9A0; Microbiology
            </button>
            <button
              className="selection-page:w-5/6 selection-page:p-8 selection-page:text-3xl max-selection-page:-mb-5 w-full self-center rounded-xl border-4 border-[#2a3543] bg-[#1f232b] p-2 text-xl transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
              onClick={() => setTopicToggleState("physiology")}
            >
              &#x1FAC0; Physiology
            </button>
          </div>
          <div className="flex w-full justify-center">
            <div className="selection-page:w-7/8 selection-page:border-3 selection-page:border-dashed selection-page:border-[#2a3543] selection-page:h-1 h-0"></div>
          </div>
          {isWide ? wideDisplayMessage(topicToggleState) : null}
        </section>
        <div className="selection-page:h-full h-1 border-3 border-dashed border-[#2a3543]"></div>
        <section className="selection-page:p-5 flex w-full flex-col overflow-hidden">
          <div className="flex flex-row items-baseline gap-3 p-5 pt-0 text-left">
            {topicToggleState === "physiology" ? (
              <p className="text-xl font-bold">
                &#x2757;{" "}
                <span className="underline">
                  Please give "Info and Links" a read first!
                </span>
              </p>
            ) : null}
            {topicToggleState === "microbiology" ? (
              <p className="text-xl font-bold">
                &#x2757;{" "}
                <span className="underline">
                  Please give "Info and Links" a read first!
                </span>
              </p>
            ) : null}
          </div>
          <div className="flex-1 overflow-y-auto">
            {topicToggleState === "physiology" ? (
              <div className="max-selection-page:gap-3 flex w-full flex-col items-start lg:flex-row">
                <section className="flex flex-1 flex-col items-start gap-3">
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Physiology Complete Set (Costanzo)"}
                      examTopicCaller={"physioFull_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Cardiovascular Physiology (Costanzo)"}
                      examTopicCaller={"cvs_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Respiratory Physiology (Costanzo)"}
                      examTopicCaller={"rs_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Neurophysiology (Costanzo)"}
                      examTopicCaller={"neuro_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Endocrine Physiology (Costanzo)"}
                      examTopicCaller={"endocrine_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Renal Physiology (Costanzo)"}
                      examTopicCaller={"renal_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Gastrointestinal Physiology (Costanzo)"}
                      examTopicCaller={"gi_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Integrative Physiology (Costanzo)"}
                      examTopicCaller={"integrative_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                </section>
                <section className="flex flex-1 flex-col items-start gap-3">
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive CVS Set"}
                      examTopicCaller={"comprehensive_cvs_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive Renal Set"}
                      examTopicCaller={"comprehensive_renal_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive GI Set"}
                      examTopicCaller={"comprehensive_gi_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive Repro Set"}
                      examTopicCaller={"comprehensive_repro_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive RS Set"}
                      examTopicCaller={"comprehensive_rs_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Comprehensive Neuro Set"}
                      examTopicCaller={"comprehensive_neuro_costanzo"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"CVS Mechanism Set"}
                      examTopicCaller={"cvs_mechanism_set"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                </section>
              </div>
            ) : null}
            {topicToggleState === "microbiology" ? (
              <div className="flex w-full flex-row items-start">
                <section className="flex flex-1 flex-col items-start gap-3">
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Case-Based Questions"}
                      examTopicCaller={"case_based_set"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"General Bacteriology"}
                      examTopicCaller={"bacteriology_gen"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"Antibacterial Set"}
                      examTopicCaller={"antibacterial"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"General Mycology"}
                      examTopicCaller={"general_mycology"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"General Virology"}
                      examTopicCaller={"general_virology"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                  <div className="ml-5 flex flex-col items-start">
                    <DropDownSelection
                      examTopicTitle={"General Parasitology"}
                      examTopicCaller={"general_parasitology"}
                      onSelection={onSelection}
                      toggleState={toggleState}
                      setToggleState={setToggleState}
                    />
                  </div>
                </section>
              </div>
            ) : null}
            {topicToggleState === null ? (
              <div className="flex h-full w-full items-center justify-center text-[#767e8b]">
                Please select the topic
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </div>
  );
}
