import "../App.css";

export default function DisplayMessage({ topicCaller, onBackToSelection }) {
  let displayTopic = false;
  let topicName = "";
  let topicMessage = "";
  let updateMessage = "";

  if (topicCaller == "physiology") {
    displayTopic = true;
    topicName = "Physiology";
    topicMessage = `
      เซ็ตนี้ก็จะมีคำถามในวิชา physiology ซึ่งส่วนใหญ่ไม่ได้มีการ
      review ในเรื่องของ quality มากเท่าไหร่
      เพราะว่าส่วนตัวรู้สึกว่าที่ NotebookLM สร้างขึ้นมาให้ก็ไม่ได้แย่
      และคำถามมีเยอะมาก ๆ ดังนั้น section นี้ก็จะค่อนข้างร้างในช่วงนี้
      (จุดประสงค์หลักของการ deploy เว็บนี้ออกมานั้นคือเพื่อให้เพื่อน ๆ
      ได้ลองใช้งานและฝึก active recall ในส่วนของ microbiology มากกว่า)
    `;
    updateMessage = "none";
  } else if (topicCaller == "microbiology") {
    displayTopic = true;
    topicName = "Microbiology";
    topicMessage = `
      เซ็ตนี้ประกอบไปด้วยคำถามในวิชา microbiology ซึ่งจะค่อนข้าง
      up-to-date มากกว่าคำถามใน section ของ physiology ซึ่งคำถามต่าง ๆ
      ก็ถูกสร้างโดย NotebookLM
      และส่วนใหญ่ผมก็ได้ตรวจเช็คแล้วว่าคำถามเหล่านั้นมีข้อบกพร่องหรือจุดที่ควรเปลี่ยนแปลงใด
      ๆ หรือไม่ ในตอนนี้เซ็ตคำถามที่มีคำอธิบายก็จะมีแค่ Antibacterial
      Agents 1-3 ซึ่งในการเขียนคำอธิบายนั้นค่อนข้างใช้เวลานาน
      ดังนั้นก็อยากให้เพื่อน ๆ ที่เข้ามาชมนั้น feedback
      กลับมาว่าควรจะเขียนเพิ่มหรือไม่ หรือมีอะไรอื่น ๆ
      ที่อยากให้มีอีกเพิ่มเติมหรือไม่ เพราะเนื่องจากเป็น project ที่ทำคนเดียว
      ดังนั้น feedback ค่อนข้างสำคัญมากครับ
    `;
    updateMessage = "none";
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-y-auto">
      <header className="header">
        <h1 className="text-xl font-bold">About</h1>
      </header>
      <section className="mx-10 mb-8 flex flex-1 flex-col items-stretch gap-4 text-lg">
        <section className="flex w-full flex-none flex-col items-start gap-4 align-middle">
          {displayTopic ? (
            <div className="mt-8 flex flex-col gap-3">
              <h1 className="text-left text-2xl font-bold">{topicName}</h1>
              <p className="mb-2 pl-5 text-left">{topicMessage}</p>
              <h1 className="text-left text-2xl font-bold">
                Update Log of the Topic
              </h1>
              <p className="pl-5 text-left">{updateMessage}</p>
            </div>
          ) : null}
        </section>
        <section className="flex w-full flex-col items-start gap-4 text-left">
          {displayTopic ? null : (
            <div className="flex h-full w-full items-center justify-center text-[#767e8b]">
              To view the info and log of the topic, select the topic first then
              revisit this page
            </div>
          )}
          <h1 className="text-left text-2xl font-bold">
            Update Log of the Website
          </h1>
          <p className="mb-2 pl-5 text-left">None</p>
          {/* <div className="flex flex-col"></div> */}
          {/* <div className="flex flex-col">
            <p>Link สำหรับ feedback ในภาพรวม:</p>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="self-start pl-5"
            >
              customize button
            </a>
          </div> */}
        </section>
        <div
          onClick={onBackToSelection}
          className="selection-page:p-3 w-full self-center rounded-xl border-4 border-[#2a3543] bg-[#1f232b] p-2 text-xl transition-all duration-200 hover:border-[#22416b] hover:bg-[#23272e] active:scale-98"
        >
          Back to Selection
        </div>
      </section>
    </div>
  );
}
