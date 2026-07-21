export default function InterviewTable({ interviews, onEdit, onDelete }) {
  function getStatusBadge(status) {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Rescheduled":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getModeBadge(mode) {
    switch (mode) {
      case "Online":
        return "bg-purple-100 text-purple-700";

      case "Offline":
        return "bg-orange-100 text-orange-700";

      case "Phone":
        return "bg-cyan-100 text-cyan-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (!interviews.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-gray-500">No interviews found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="px-5 py-3">Company</th>
            <th className="px-5 py-3">Position</th>
            <th className="px-5 py-3">Round</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Time</th>
            <th className="px-5 py-3">Mode</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Interviewer</th>
            <th className="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id} className="border-t hover:bg-gray-50">
              <td className="px-5 py-4">{interview.application?.company}</td>

              <td className="px-5 py-4">{interview.application?.position}</td>

              <td className="px-5 py-4">{interview.round}</td>

              <td className="px-5 py-4">
                {new Date(interview.date).toLocaleDateString()}
              </td>

              <td className="px-5 py-4">{interview.time}</td>

              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getModeBadge(
                    interview.mode,
                  )}`}
                >
                  {interview.mode}
                </span>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    interview.status,
                  )}`}
                >
                  {interview.status}
                </span>
              </td>

              <td className="px-5 py-4">{interview.interviewer || "-"}</td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(interview)}
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(interview)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
