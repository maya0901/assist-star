import { useState } from "react";

/* =========================
   Distance calculation
   ========================= */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/* =========================
   Mock volunteers
   ========================= */
function generateNearbyVolunteers(baseLat, baseLng) {
  return [
    {
      name: "Ravi",
      skill: "Electrician",
      helped: 18,
      rating: 4.8,
      phone: "98XXXX123",
      lat: baseLat + 0.002,
      lng: baseLng + 0.001
    },
    {
      name: "Joseph",
      skill: "Plumber",
      helped: 32,
      rating: 4.9,
      phone: "96XXXX789",
      lat: baseLat + 0.003,
      lng: baseLng - 0.002
    },
    {
      name: "Asha",
      skill: "Home Tutor",
      helped: 12,
      rating: 4.6,
      phone: "97XXXX456",
      lat: baseLat - 0.002,
      lng: baseLng + 0.001
    }
  ];
}

/* =========================
   AI-powered help requests (DEMO x3)
   ========================= */
function generateHelpRequests(baseLat, baseLng, aiProblem) {
  const base = {
    summary: aiProblem?.summary || "General help needed",
    category: aiProblem?.category || "Other"
  };

  return [
    {
      name: "Anita",
      ...base,
      urgency: aiProblem?.urgency || "Medium",
      phone: "95XXXX111",
      lat: baseLat + 0.001,
      lng: baseLng + 0.002
    },
    {
      name: "Rahul",
      ...base,
      urgency: "High",
      phone: "94XXXX222",
      lat: baseLat - 0.002,
      lng: baseLng + 0.001
    },
    {
      name: "Meera",
      ...base,
      urgency: "Low",
      phone: "93XXXX333",
      lat: baseLat + 0.003,
      lng: baseLng - 0.002
    }
  ];
}

export default function Swipe() {
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState(false);

  // 🔥 NEW: swipe animation state
  const [swipeDir, setSwipeDir] = useState(null);

  const role = localStorage.getItem("role");

  let aiProblem = null;
  try {
    aiProblem = JSON.parse(localStorage.getItem("problem"));
  } catch {
    aiProblem = null;
  }

  if (!role) {
    window.location.href = "/role";
    return null;
  }

  const baseLat = 12.9716;
  const baseLng = 77.5946;

  const cards =
    role === "volunteer"
      ? generateHelpRequests(baseLat, baseLng, aiProblem)
      : generateNearbyVolunteers(baseLat, baseLng);

  if (index >= cards.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400">
        <p className="text-white text-lg">No more nearby matches</p>
      </div>
    );
  }

  const card = cards[index];
  const distance = getDistanceKm(baseLat, baseLng, card.lat, card.lng);

  /* =========================
     Swipe handlers
     ========================= */
  const swipe = (dir) => {
    setSwipeDir(dir);
    setTimeout(() => {
      setSwipeDir(null);
      setIndex((i) => i + 1);
    }, 300);
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 px-4 relative">

      <div className="pt-5 text-center text-white text-sm opacity-90">
        {role === "volunteer"
          ? "AI-analyzed help requests near you"
          : "Volunteers near you"}
      </div>

      {/* MATCH OVERLAY */}
      {matched && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="bg-white rounded-3xl p-8 text-center w-80">
            <h2 className="text-xl font-semibold mb-2">It’s a match!</h2>
            <p className="mb-4">Contact number:</p>
            <p className="bg-gray-100 rounded-full px-4 py-2 inline-block mb-4">
              {card.phone}
            </p>
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full"
              onClick={() => {
                setMatched(false);
                swipe("right");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div
          className={`bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-6 text-center
          transition-transform duration-300 ease-out
          ${
            swipeDir === "left"
              ? "-translate-x-full -rotate-12 opacity-0"
              : swipeDir === "right"
              ? "translate-x-full rotate-12 opacity-0"
              : ""
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">{card.name}</h2>

          {role === "volunteer" ? (
            <>
              <p className="text-lg text-gray-700">{card.summary}</p>
              <div className="flex justify-center gap-2 mt-4">
                <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                  {card.category}
                </span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  Urgency: {card.urgency}
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg">{card.skill}</p>
              <p className="text-sm text-gray-600 mt-2">
                ⭐ {card.rating} · 🤝 {card.helped}
              </p>
            </>
          )}

          <p className="text-sm text-gray-500 mt-4">
            {distance} km away
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pb-8 flex justify-center gap-10">
        <button
          className="w-16 h-16 rounded-full bg-white text-red-500 text-2xl shadow-xl"
          onClick={() => swipe("left")}
        >
          ✕
        </button>

        <button
          className="w-16 h-16 rounded-full bg-black text-white text-2xl shadow-xl"
          onClick={() => setMatched(true)}
        >
          ❤
        </button>
      </div>
    </div>
  );
}
