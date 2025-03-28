import { useState } from "react";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleAuth = (e) => {
    e.preventDefault();

    // Hardcoded authentication check
    if (email === "hinzanno@gmail.com" && password === "admin") {
      onLogin(); // Call the onLogin function (sets the user as authenticated)
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
