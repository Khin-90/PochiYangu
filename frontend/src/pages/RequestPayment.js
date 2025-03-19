import React from "react";

const RequestPayment = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Request Payment</h1>
      <div className="mt-4">
        <label className="block">Enter Phone Number</label>
        <input type="text" className="border p-2 w-full" />
        <button className="bg-green-500 text-white px-4 py-2 mt-4">Continue</button>
      </div>
    </div>
  );
};

export default RequestPayment;