export default function ApplicationTable({ applications, loading }) {
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
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-10 text-gray-500">
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{application.company}</td>

                <td className="p-4">{application.position}</td>

                <td className="p-4">{application.status}</td>

                <td className="p-4">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </td>

                <td className="p-4">Actions</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
