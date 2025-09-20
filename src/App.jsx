import { useState } from "react";

export default function App() {
  const [day, setDay] = useState(10);

  const nextDay = () => {
    if (day > 1) setDay(day - 1);
    else setDay(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-4xl font-bold text-pink-800 mb-4">Lose Him Fast 💔</h1>
      <h2 className="text-6xl font-extrabold text-pink-700 mb-6">Day {day}</h2>

      <button
        onClick={nextDay}
        className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 active:scale-95 transition"
      >
        Next Day
      </button>
    </div>
  );
}
