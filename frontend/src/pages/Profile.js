import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    walletId: "Loading...",
    status: "new",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/user-profile")
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Header */}
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

        {/* User Info */}
        <div className="text-center">
          <p className="text-lg"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Wallet ID:</strong> {user.walletId}</p>
          
          {/* User Status Badge */}
          <span className={`inline-block px-3 py-1 mt-3 rounded-full text-white text-sm ${
            user.status === "frequent" ? "bg-green-500" : "bg-gray-500"
          }`}>
            {user.status === "frequent" ? "Frequent User" : "New User"}
          </span>
        </div>

        {/* Edit Profile Button (For future expansion) */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
