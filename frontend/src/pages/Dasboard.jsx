import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
// import StatCard from "../components/StatCard";
import InvestmentTable from "../components/InvestmentTable";
import StatCard from "../components/StatCards";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => (window.location.href = "/"));
  }, []);

  if (!data) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Wallet Balance" value={data.walletBalance} />
        <StatCard title="Total Invested" value={data.totalInvested} />
        <StatCard title="Total ROI" value={data.totalROI} />
        <StatCard title="Level Income" value={data.totalLevelIncome} />
      </div>

      <div className="p-6">
        <InvestmentTable investments={data.investments} />
      </div>
    </div>
  );
}
