import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

console.log("Gemini key:", import.meta.env.VITE_GEMINI_API_KEY);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/swipe");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 px-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8">

        {/* App name */}
        <h1 className="text-3xl font-bold text-center mb-1 text-gray-900">
          Assist-Star
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Community help, nearby
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl text-lg font-semibold active:scale-95 transition"
          onClick={login}
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-300" />
          or
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <span
            className="text-pink-600 font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
