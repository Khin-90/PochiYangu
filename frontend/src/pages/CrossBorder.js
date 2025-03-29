import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/cards";
import { Button } from "../components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Typewriter from "typewriter-effect";
import { CheckCircle, XCircle } from "lucide-react";
import "../styles/CrossBorder.css";

const CrossBorder = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("KES");
  const [historicalData, setHistoricalData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  const generateGraphData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      date: `Day ${i + 1}`,
      rate: Math.random() * (exchangeRates ? exchangeRates[targetCurrency] : 1) * 2,
    }));
  };

  const handleSendMoney = () => {
    setTransactionStatus("pending");
    setTimeout(() => {
      const success = Math.random() > 0.3; 
      setTransactionStatus(success ? "success" : "failed");
      setTimeout(() => {
        setTransactionStatus(null);
        setShowForm(false);
        setAmount("");
        setRecipient("");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Button className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-lg" onClick={() => setShowForm(true)}>
          Send Money
        </Button>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Exchange Rate</h2>
            <div className="flex gap-4">
              <select className="p-2 border" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
                {exchangeRates &&
                  Object.keys(exchangeRates).map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
              <span className="self-center">to</span>
              <select className="p-2 border" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                {exchangeRates &&
                  Object.keys(exchangeRates).map((currency) => <option key={currency} value={currency}>{currency}</option>)}
              </select>
            </div>
            <p className="mt-2">
              1 {baseCurrency} = {exchangeRates ? exchangeRates[targetCurrency] : "..."} {targetCurrency}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Exchange Rate Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={generateGraphData()}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-4 border-orange-500">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-2">Why Choose Pochi Yangu?</h2>
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter) => {
              typewriter.typeString("Hedera Hashgraph is fast, secure, and low-cost.").pauseFor(2000).deleteAll()
                .typeString("Send money globally with minimal fees.").pauseFor(2000).deleteAll()
                .typeString("Guaranteed security and speed with blockchain technology.").pauseFor(2000).start();
            }}
          />
        </CardContent>
      </Card>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-xl w-96">
            {transactionStatus === null ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Send Money</h2>
                <input
                  type="text"
                  placeholder="Recipient Email or Hedera Account"
                  className="w-full p-2 mb-3 border rounded-md"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full p-2 mb-3 border rounded-md"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleSendMoney}>
                    Send
                  </Button>
                  <Button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {transactionStatus === "success" ? (
                  <CheckCircle className="text-green-500 w-16 h-16" />
                ) : (
                  <XCircle className="text-red-500 w-16 h-16" />
                )}
                <p className="text-lg font-semibold mt-3">{transactionStatus === "success" ? "Transaction Confirmed" : "Transaction Failed"}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossBorder;
