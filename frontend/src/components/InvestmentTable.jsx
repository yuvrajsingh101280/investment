export default function InvestmentTable({ investments = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="font-semibold mb-4">Your Investments</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Amount</th>
            <th>Plan</th>
            <th>Status</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv._id} className="border-t">
              <td className="py-2">₹{inv.amount}</td>
              <td>{inv.plan}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    inv.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100"
                  }`}
                >
                  {inv.status}
                </span>
              </td>
              <td>{new Date(inv.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
