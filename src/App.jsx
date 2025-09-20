import { useState } from "react";
import { generateSpeech } from "./elevenlabs";

const CHALLENGES = [
  "Reply only with 🐢 emojis for 24 hours.",
  "Bring a tiny fern to his place with no explanation.",
  "Venmo him $0.02 with the note 'for your thoughts.'",
  "Start every text with 'Princess Sophia says hi.'",
];

export default function App() {
  const [day, setDay] = useState(10);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentChallenge = CHALLENGES[(10 - day) % CHALLENGES.length];

  const nextDay = () => {
    if (day > 1) setDay(day - 1);
    else setDay(0);
  };

  const handleSpeak = async () => {
    setIsSpeaking(true);
    const url = await generateSpeech(
      `Day ${day}. Your challenge: ${currentChallenge}`
    );
    if (url) new Audio(url).play();
    else alert("Voice failed. Check your ElevenLabs API key in .env");
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-pink-800 mb-2">Lose Him Fast 💔</h1>
      <p className="text-pink-700 mb-4">Voice-first breakup coach</p>

      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md">
        <h2 className="text-6xl font-extrabold text-pink-700 mb-3">Day {day}</h2>

        <p className="text-gray-500 text-sm mb-6">
          Tap “Speak” to hear today’s challenge.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className={`px-6 py-2 rounded-full text-white transition ${
              isSpeaking ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {isSpeaking ? "Loading..." : "🎙️ Speak Challenge"}
          </button>

          <button
            onClick={nextDay}
            className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 active:scale-95 transition"
          >
            Next Day
          </button>
        </div>
      </div>

      <footer className="text-[11px] text-gray-500 mt-6">
        Humor tool; be kind & safe 💌
      </footer>
    </div>
  );
}
