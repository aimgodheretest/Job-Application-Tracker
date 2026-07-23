import ActionButton from "../common/ActionButton";
import StatusBadge from "../common/StatusBadge";

export default function ApplicationTable({
  applications,
  loading,
  onEdit,
  onDelete,
  onDocuments,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Position</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Applied Date</th>
            <th className="w-40 text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-16">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">📄</div>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    No applications found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Try changing your search or filters, or add a new
                    application.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{application.company}</td>

                <td className="p-4">{application.position}</td>

                <td className="p-4">
                  <StatusBadge status={application.status} />
                </td>

                <td className="p-4">
                  {new Date(application.appliedDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      type="edit"
                      onClick={() => onEdit(application)}
                    />

                    <ActionButton
                      type="document"
                      onClick={() => onDocuments(application)}
                    />

                    <ActionButton
                      type="delete"
                      onClick={() => onDelete(application.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
