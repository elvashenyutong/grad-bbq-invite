import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas-pro";
import { motion, AnimatePresence } from "framer-motion";
import envelopeImg from "/assets/envelope.png";
import partyImg from "/assets/balloons.png";
import confettiImg from "/assets/confetti.png";


export default function GraduationInvite() {
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const images = [
  { id: 1, src: new URL('/assets/1.jpeg', import.meta.url).href },
  { id: 2, src: new URL('/assets/2.jpeg', import.meta.url).href },
  { id: 3, src: new URL('/assets/3.jpeg', import.meta.url).href },
  { id: 4, src: new URL('/assets/4.jpeg', import.meta.url).href },
  { id: 5, src: new URL('/assets/5.jpeg', import.meta.url).href },
  { id: 6, src: new URL('/assets/6.jpeg', import.meta.url).href },
  { id: 7, src: new URL('/assets/7.jpeg', import.meta.url).href },
  { id: 8, src: new URL('/assets/8.jpeg', import.meta.url).href },
  { id: 9, src: new URL('/assets/9.jpeg', import.meta.url).href },
];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (submitted && name && ticketRef.current) {
      const originalDisplay = ticketRef.current.style.display;
      ticketRef.current.style.display = 'block';

      html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      }).then((canvas) => {
        setTicketImageUrl(canvas.toDataURL("image/png"));
        if (ticketRef.current) {
           ticketRef.current.style.display = 'none';
        }
      }).catch(err => {
        console.error("Error generating ticket image:", err);
        if (ticketRef.current) {
          ticketRef.current.style.display = originalDisplay;
        }
      });
    }
  }, [submitted, name, attendance]);

  return (
    <div className="bg-[#fdf4e3] min-h-screen p-6 flex flex-col items-center text-[#333]">
      {!opened ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={envelopeImg}
            alt="Envelope"
            className="w-96 mt-24 cursor-pointer hover:scale-105 transition-all drop-shadow-lg hover:drop-shadow-2xl\"
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(true)}
          />
          <p className="mt-4 text-lg text-center">Click the envelope to open your invitation 💌</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl font-bold text-[#d94f30] mb-6 text-center"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              🎓 🎓 🎓 
            </motion.h1>
            <motion.h2
              className="text-4xl font-bold text-[#d94f30] mb-6 text-center"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Elva & Hannah's Graduation Party 
            </motion.h2>

            {!submitted && (
            <img src={partyImg} alt="Party" className="w-32 mx-auto mb-4" />
            )}

            {!submitted && (
              <div className="text-sm leading-relaxed text-[#444] mb-6">
                <p className="mb-2">親愛的朋朋們</p>
                <p className="mb-2">我們畢業啦！誠摯邀請你來參加我們的畢業泳池烤肉趴～</p>
                <p className="mb-2">大家一起來吃吃喝喝、玩水、聊天、喝酒！</p>
                <p className="mt-4">📍 地點：The Canterbury（我們家）泳池旁烤肉區</p>
                <p>📅 日期：5月28日（三）</p>
                <p>🕟 時間：下午4:30集合，5:00準時開烤！</p>
                <p className="mt-4">🩱 泳池開放，歡迎自備泳具來玩水！</p>
                <p>🍢 食材我們會統一準備，費用將依照人數平均分攤～</p>
                <p className="mt-4">請務必來玩～～畢業就要跟你們一起慶祝💛</p>
              </div>
          )}

            {!submitted && (
              <div className="relative w-full h-full aspect-[3/4] mb-6 p-0 overflow-hidden shadow-md">
                {images.map((img, i) => (
                  <motion.img
                    key={img.id}
                    src={img.src}
                    alt={`Grad Photo ${img.id}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  />
                ))}
              </div>
            )}

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!attendance) {
                    alert("Please select if you will attend.");
                    return;
                  }

                  fetch("https://docs.google.com/forms/d/e/1FAIpQLScW6MLtQ9miirY0qi5NClrEu4J8IPTBraAV7KTQZxOqtGjEfA/formResponse", {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        "entry.832335222": name || "",
                        "entry.677427612": attendance === "yes" ? "Yes – 🕺 Count me in! I’m ready to party!" : "No – 🙈 Can’t make it, sending hugs!",
                        "entry.802614781": message || ""
                      }).toString()
                  });

                  setSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                 <div>
                  <p className="font-semibold mb-1 text-sm">What's your name?</p>
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded text-sm"
                  />
                 </div>
                

                <div>
                  <p className="font-semibold mb-1 text-sm">Will you attend?</p>
                  <label className="flex items-center gap-2 mb-1 text-sm">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === "yes"}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="accent-green-600 appearance-none border-2 border-gray-400 rounded-full w-4 h-4 checked:border-green-600 checked:bg-green-600"
                    />
                    <span className={attendance === "yes" ? "text-green-700 font-semibold" : ""}>Yes – 🕺 Count me in! I’m ready to party!</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === "no"}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="accent-red-600 appearance-none border-2 border-gray-400 rounded-full w-4 h-4 checked:border-red-600 checked:bg-red-600"
                    />
                    <span className={attendance === "no" ? "text-red-700 font-semibold" : ""}>No – 🙈 Can’t make it, sending hugs!</span>
                                    </label>
                </div>


                <textarea
                  placeholder="Any message? (optional)"
                  className="border p-2 rounded text-sm"
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-[#d94f30] text-white rounded p-2 font-semibold hover:bg-[#bb4025]"
                >
                  Submit
                </button>
              </form>
            ) : (
              <motion.div
                className="text-green-700 text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img src={confettiImg} alt="Confetti" className="w-24 mx-auto mb-3" />
                <p className="text-xl font-semibold">🎉 Thanks for your response!</p>
                <p className="mt-2">We can’t wait to see you there! 💖</p>

                {submitted && (
                  <div id="photo-grid" className="grid grid-cols-3 grid-rows-3 gap-2 mb-6">
                  {images.map((img, i) => (
                    <motion.div
                      key={img.id}
                      className="relative overflow-hidden rounded-lg transition-all duration-300 aspect-square"
                      onMouseEnter={(e) => {
                        const container = document.getElementById("photo-grid");
                        if (!container) return;

                        

                        const col = i % 3;
                        const row = Math.floor(i / 3);
                        const total = 9; // fix to expected total for layout control

                        const isRightEdge = col === 2;
                        const isLeftEdge = col === 0;
                        const isBottomEdge = row === 2;
                        const isTopEdge = row === 0;

                        [...container.children].forEach((el, index) => {
                          el.classList.remove(
                            "col-span-1", "row-span-1",
                            "col-span-2", "row-span-2",
                            "z-20", "col-start-1", "col-start-2", "col-start-3",
                            "row-start-1", "row-start-2", "row-start-3"
                          );
                          el.classList.add("col-span-1", "row-span-1");
                        });

                        const target = container.children[i];
                        if (!target) return;

                        if (i === 2 || i === 5 || i === 8) target.classList.add("col-start-2");
                        if (i === 2) target.classList.add("row-start-1");
                        if (i === 5) target.classList.add("row-start-2");
                        if (i === 8) target.classList.add("row-start-3");


                        target.classList.add("col-span-2", "row-span-2", "z-20");
                      }}
                      onMouseLeave={() => {
                        const container = document.getElementById("photo-grid");
                        if (!container) return;

                        

                        [...container.children].forEach((el) => {
                          el.classList.remove("col-span-2", "row-span-2", "z-20", "col-start-1", "col-start-2", "col-start-3", "row-start-1", "row-start-2", "row-start-3");
                          el.classList.add("col-span-1", "row-span-1");
                        });
                      }}
                    >
                      <img
                        src={img.src}
                        alt={`Photo ${img}`}
                        className="object-cover w-full h-full transition duration-300 ease-in-out"
                      />
                    </motion.div>
                  ))}
                </div>
)}


                <div id="ticket-container" className="mt-6 max-w-md mx-auto w-full">
                  {ticketImageUrl ? (
                    <img src={ticketImageUrl} alt="Graduation Party Pass" className="w-full rounded-2xl shadow-xl" />
                  ) : (
                    <div 
                      ref={ticketRef} 
                      id="ticket" 
                      className="px-6 py-4 bg-gradient-to-br from-[#fff8f3] to-[#ffe5d1] border border-[#d94f30] rounded-2xl text-[#333] shadow-xl text-left font-serif"
                      style={{ display: submitted && name ? 'block' : 'none' }}
                    >
                      <div className="border-b border-[#d94f30] mb-3 pb-2">
                        <h2 className="text-base font-bold text-[#d94f30]">🎫 Graduation Party Pass</h2>
                      </div>
                      <p className="mb-1 text-xs">👤 <strong>Name:</strong> {name}</p>
                      <p className="mb-1 text-xs">📅 <strong>Date:</strong> May 28 (Wed)</p>
                      <p className="mb-1 text-xs">📍 <strong>Location:</strong> The Canterbury – Poolside</p>
                      <p className="mb-1 text-xs">🕔 <strong>Time:</strong> 4:30 PM gather, 5:00 PM BBQ</p>
                      <p className="mt-3 italic text-xs text-[#7a5549]">
                        {attendance === "yes"
                          ? "Get ready for fun in the sun, food, and celebration! ☀️🍢🎉"
                          : "If your plans change, feel free to let us know. We'd still love to see you! 💛"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 print:hidden text-center">
                  <p className="mb-1 text-xs text-[#7a5549]"> Tap and hold to save the image.</p>
                  {ticketImageUrl && (
                    <a
                      href={ticketImageUrl}
                      download={`Graduation_Pass_${name || 'Guest'}.png`}
                      className="bg-[#d94f30] text-white px-4 py-2 rounded hover:bg-[#bb4025] text-sm inline-block"
                    >
                      📥 Save Ticket
                    </a>
                  )}
                </div>

              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
