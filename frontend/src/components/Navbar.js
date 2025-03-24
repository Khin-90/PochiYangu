import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashConnect } from "hashconnect";

const Navbar = () => {
  const [walletId, setWalletId] = useState(null);
  const hashconnect = new HashConnect();

  useEffect(() => {
    const initHashPack = async () => {
      const appMetadata = {
        name: "Pochi Yangu",
        description: "Secure Web3 Transactions",
        icon: "https://your-logo-url.com/logo.png",
      };

      const initData = await hashconnect.init(appMetadata);
      hashconnect.connectToLocalWallet();

      hashconnect.pairingEvent.once((pairingData) => {
        if (pairingData.accountIds.length > 0) {
          setWalletId(pairingData.accountIds[0]);
        }
      });
    };

    initHashPack();
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Pochi Yangu
        </Link>
        <div className="flex space-x-4">
          <Link to="/wallet" className="hover:underline">Wallet</Link>
          <Link to="/transfer" className="hover:underline">Transfer</Link>
          <Link to="/transactions" className="hover:underline">Transactions</Link>
          {walletId ? (
            <span className="bg-green-500 px-3 py-1 rounded">
              {walletId}
            </span>
          ) : (
            <button
              onClick={() => hashconnect.connectToLocalWallet()}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
