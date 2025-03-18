import React from "react";

const Profile = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <p className="mt-2">View and manage your account details.</p>
      <div className="mt-4">
        <p>
          Here, you can update your personal information, change your password, and view your transaction history.
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Account Details</h2>
          <ul className="list-disc list-inside mt-2">
            <li>Name: John Doe</li>
            <li>Email: johndoe@example.com</li>
            <li>Phone: +254 712 345 678</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;