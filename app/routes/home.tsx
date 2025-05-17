import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import envelopeImg from "/src/assets/envelope.png";
import partyImg from "/src/assets/balloons.png";
import confettiImg from "/src/assets/confetti.png";

export default function GraduationInvite() {
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
          <p className="mt-4 text-lg">Click the envelope to open your invitation 💌</p>
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
              🎓 Elva & Hannah's Graduation Party 
            </motion.h1>

            <img src={partyImg} alt="Party" className="w-32 mx-auto mb-4" />


            <div className="text-base leading-relaxed text-[#444] mb-6">
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

            {/* <img src={partyImg} alt="Party" className="w-32 mx-auto mb-4" />

            <p className="mb-2"><strong>Date:</strong> Wednesday, May 28</p>
            <p className="mb-2"><strong>Time:</strong> 4:30 PM gather | 5:00 PM BBQ</p>
            <p className="mb-2"><strong>Location:</strong> The Canterbury – poolside BBQ</p>
            <p className="mb-2"><strong>Optional:</strong> Bring swimsuits!</p>
            <p className="mb-4"><strong>Note:</strong> Food cost will be split evenly</p> */}

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
                  <p className="font-semibold mb-1">What's your name?</p>
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded"
                  />
                 </div>
                

                <div>
                  <p className="font-semibold mb-1">Will you attend?</p>
                  <label className="flex items-center gap-2 mb-1">
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
                                    <label className="flex items-center gap-2">
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
                  className="border p-2 rounded"
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-[#d94f30] text-white rounded p-2 font-semibold hover:bg-[#bb4025]"
                >
                  Submit RSVP
                </button>
              </form>
            ) : (
              <motion.div
                className="text-green-700 text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <img src={confettiImg} alt="Confetti" className="w-24 mx-auto mb-3" />
                <p className="text-xl font-semibold">🎉 Thanks for your RSVP!</p>
                <p className="mt-2">We can’t wait to see you there! 💖</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
