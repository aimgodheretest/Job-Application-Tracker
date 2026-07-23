import ActionButton from "../common/ActionButton";
import StatusBadge from "../common/StatusBadge";

export default function InterviewTable({ interviews, onEdit, onDelete }) {
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
            <th className="w-40 px-5 py-3 text-center">Actions</th>
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
                <StatusBadge status={interview.status} />
              </td>

              <td className="px-5 py-4">{interview.interviewer || "-"}</td>

              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-2">
                  <ActionButton type="edit" onClick={() => onEdit(interview)} />

                  <ActionButton
                    type="delete"
                    onClick={() => onDelete(interview)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
