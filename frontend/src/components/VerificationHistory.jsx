import React from "react";

const VerificationHistory = () => {
  // Example certificate objects
  const history = [
    {
      certId: "CERT-001",
      name: "John Doe",
      university: "MIT",
      date: "2024-01-15",
      status: "verified",
    },
    {
      certId: "CERT-002",
      name: "Jane Smith",
      university: "Harvard",
      date: "2024-01-20",
      status: "unverified",
    },
    {
      certId: "CERT-003",
      name: "Alice Johnson",
      university: "Stanford",
      date: "2024-02-05",
      status: "verified",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Verification History</h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No certificates verified yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Certificate ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">University</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.certId}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.university}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    item.status === "verified" ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {item.status}
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
