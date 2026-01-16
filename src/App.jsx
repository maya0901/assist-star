import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Role from "./Role";
import Swipe from "./Swipe";
import ProblemInput from "./ProblemInput";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Role selection */}
      <Route path="/role" element={<Role />} />

      {/* Help seeker describes problem (Gemini) */}
      <Route path="/problem" element={<ProblemInput />} />

      {/* Swipe screen (both roles land here eventually) */}
      <Route path="/swipe" element={<Swipe />} />
    </Routes>
  );
}