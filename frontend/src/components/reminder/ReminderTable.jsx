export default function ReminderTable({
  reminders,
  onEdit,
  onDelete,
  onComplete,
}) {
  function getStatusBadge(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (!reminders.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-gray-500">No reminders found.</p>
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
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Time</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id} className="border-t hover:bg-gray-50">
              <td className="px-5 py-4">{reminder.application?.company}</td>

              <td className="px-5 py-4">{reminder.application?.position}</td>

              <td className="px-5 py-4">{reminder.title}</td>

              <td className="px-5 py-4">
                {new Date(reminder.reminderDate).toLocaleDateString()}
              </td>

              <td className="px-5 py-4">{reminder.reminderTime}</td>

              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    reminder.status,
                  )}`}
                >
                  {reminder.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
                  {reminder.status === "Pending" && (
                    <button
                      onClick={() => onComplete(reminder)}
                      className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(reminder)}
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(reminder)}
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
