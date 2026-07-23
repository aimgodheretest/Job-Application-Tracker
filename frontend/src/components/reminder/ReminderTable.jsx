import ActionButton from "../common/ActionButton";
import StatusBadge from "../common/StatusBadge";

export default function ReminderTable({
  reminders,
  onEdit,
  onDelete,
  onComplete,
}) {
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
            <th className="w-40 px-5 py-3 text-center">Actions</th>
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
                <StatusBadge status={reminder.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-2">
                  {reminder.status === "Pending" && (
                    <ActionButton
                      type="complete"
                      onClick={() => onComplete(reminder)}
                    />
                  )}

                  <ActionButton type="edit" onClick={() => onEdit(reminder)} />

                  <ActionButton
                    type="delete"
                    onClick={() => onDelete(reminder)}
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
