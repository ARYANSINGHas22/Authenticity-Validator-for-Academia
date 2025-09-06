import React from "react";

const VerificationHistory = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full ">
      <h2 className="text-xl font-bold mb-4 text-center">Verification History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No verifications yet.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Certificate ID</th>
              <th className="py-2 px-4">Candidate Name</th>
              <th className="py-2 px-4">Status</th>
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
