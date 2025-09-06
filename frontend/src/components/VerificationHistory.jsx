import React from "react";

const VerificationHistory = ({ history }) => {
  return (
    <div className="w-full card">
      <h1 > <i class="fa-solid fa-magnifying-glass"></i> Verification History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No verifications yet.</p>
      ) : (
        <table className="">
  <thead>
    <tr className="border-b">
      <th className="py-2 px-4 text-left">Certificate ID</th>
      <th className="py-2 px-4 text-left">Candidate Name</th>
      <th className="py-2 px-4 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {history.map((item, index) => (
      <tr key={index} className="border-b">
        <td className="py-2 px-4">{item.certId}</td>
        <td className="py-2 px-4">{item.studentName}</td>
        <td className="py-2 px-4">
          {item.status === "verified" ? "✅ Verified" : "❌ Not Found"}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
};

export default VerificationHistory;
