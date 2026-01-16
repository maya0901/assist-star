export default function Role() {
  const chooseRole = (role) => {
    localStorage.setItem("role", role);

    if (role === "volunteer") {
      window.location.href = "/volunteer";
    } else {
      window.location.href = "/swipe";
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">
        How would you like to proceed?
      </h1>

      <button
        className="w-64 bg-black text-white py-3 rounded mb-4"
        onClick={() => chooseRole("help")}
      >
        I need help
      </button>

      <button
        className="w-64 bg-green-600 text-white py-3 rounded"
        onClick={() => chooseRole("volunteer")}
      >
        I want to volunteer
      </button>
    </div>
  );
}