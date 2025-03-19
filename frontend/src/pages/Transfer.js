import React from "react";

const Transfer = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Transfer Funds</h1>
      <div className="mt-4">
        <label className="block">Select Bank</label>
        <select className="border p-2 w-full">
          <option>Abc Bank</option>
          <option>Absa</option>
          <option>Access Bank</option>
          {/* Add more banks here */}
        </select>
        <label className="block mt-2">Account Number</label>
        <input type="text" className="border p-2 w-full" />
        <button className="bg-green-500 text-white px-4 py-2 mt-4">Continue</button>
      </div>
    </div>
  );
};

export default Transfer;