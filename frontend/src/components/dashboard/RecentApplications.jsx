export default function RecentApplications() {
  const applications = [
    {
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
    },
    {
      company: "Microsoft",
      role: "Backend Developer",
      status: "Applied",
    },
    {
      company: "Amazon",
      role: "SDE-1",
      status: "Rejected",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-5">Recent Applications</h2>

      <div className="space-y-4">
        {applications.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 last:border-none"
          >
            <div>
              <h3 className="font-semibold">{item.company}</h3>

              <p className="text-sm text-gray-500">{item.role}</p>
            </div>

            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
