import { useState } from "react";

export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  };

  const submit = () => {
    const data = { name, skill, phone, location };
    localStorage.setItem("volunteer", JSON.stringify(data));
    window.location.href = "/swipe";
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl mb-4">Volunteer Details</h1>

      <input
        placeholder="Your name"
        className="border p-2 mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Your skill"
        className="border p-2 mb-2"
        onChange={(e) => setSkill(e.target.value)}
      />

      <input
        placeholder="Phone"
        className="border p-2 mb-4"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-6 py-2 mb-4"
        onClick={getLocation}
      >
        Use my location
      </button>

      {location && <p className="text-sm mb-2">Location saved ✔</p>}

      <button
        className="bg-black text-white px-6 py-2"
        onClick={submit}
      >
        Continue
      </button>
    </div>
  );
}