import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateInvestment() {
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("BASIC");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      await api.post("/investments", {
        amount: Number(amount),
        plan,
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create investment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center mt-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">
            Create Investment
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Choose a plan and start earning daily ROI
          </p>

          {/* Amount */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-1">
              Investment Amount (₹)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Plan */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              Select Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="BASIC">BASIC – 1% daily (30 days)</option>
              <option value="PREMIUM">PREMIUM – 1.5% daily (60 days)</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Invest Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
