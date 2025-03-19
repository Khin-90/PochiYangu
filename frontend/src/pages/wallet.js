import React from "react";

const Wallet = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <div className="mt-4">
        <p className="text-lg">Ksh 0</p>
        <div className="mt-2">
          <button className="bg-green-500 text-white px-4 py-2 mr-2">Add Money</button>
          <button className="bg-green-500 text-white px-4 py-2">Send Money</button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;