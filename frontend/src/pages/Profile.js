import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "John Kamau",
    phoneNumber: "+254 712 345 678",
    email: "john.kamau@example.com",
    idNumber: "12345678",
    county: "Nairobi",
    memberSince: "January 2023",
    loanEligibility: "Eligible",
    kycStatus: "Verified",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...profile});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulating API call to get user profile
  useEffect(() => {
    // Replace with actual API call
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // Uncomment and modify when backend is ready
        // const response = await axios.get("http://localhost:8000/api/profile/");
        // setProfile(response.data);
        
        // Simulating API delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching profile:", err);
      }
    };
    
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Uncomment and modify when backend is ready
      // await axios.put("http://localhost:8000/api/profile/", formData);
      
      // Simulating API delay
      setTimeout(() => {
        setProfile(formData);
        setIsEditing(false);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to update profile. Please try again later.");
      setIsLoading(false);
      console.error("Error updating profile:", err);
    }
  };

  if (isLoading && !profile) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-gray-700">County</label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <p className="text-gray-600">Full Name</p>
                <p className="font-semibold">{profile.fullName}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-semibold">{profile.phoneNumber}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
              
              <div>
                <p className="text-gray-600">ID Number</p>
                <p className="font-semibold">{profile.idNumber}</p>
              </div>
              
              <div>
                <p className="text-gray-600">County</p>
                <p className="font-semibold">{profile.county}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Member Since</p>
                <p className="font-semibold">{profile.memberSince}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Account Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div>
                <p className="text-gray-600">Loan Eligibility</p>
                <p className={`font-semibold ${profile.loanEligibility === "Eligible" ? "text-green-600" : "text-red-600"}`}>
                  {profile.loanEligibility}
                </p>
              </div>
              
              <div>
                <p className="text-gray-600">KYC Status</p>
                <p className={`font-semibold ${profile.kycStatus === "Verified" ? "text-green-600" : "text-yellow-600"}`}>
                  {profile.kycStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;