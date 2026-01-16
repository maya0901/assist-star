import { useState } from "react";
import { analyzeProblem } from "./gemini";
import { useNavigate } from "react-router-dom";

export default function ProblemInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeProblem(text);
      localStorage.setItem("problem", JSON.stringify(result));
      navigate("/swipe");
    } catch (e) {
      alert("AI failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 px-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6">
        <h2 className="text-xl font-bold mb-3 text-center">
          Describe your problem
        </h2>

        <textarea
          rows={4}
          placeholder="E.g. My ceiling fan stopped working and is making noise"
          className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Find help"}
        </button>
      </div>
    </div>
  );
}
