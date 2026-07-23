export default function SavedJobTable({ savedJobs, onEdit, onDelete }) {
  if (savedJobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border p-8 text-center">
        <p className="text-gray-500">No saved jobs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Job Title</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Job Type</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Deadline</th>
            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {savedJobs.map((job) => (
            <tr key={job.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{job.companyName}</td>

              <td className="p-4">{job.jobTitle}</td>

              <td className="p-4">{job.location || "-"}</td>

              <td className="p-4">{job.jobType}</td>

              <td className="p-4">{job.status}</td>

              <td className="p-4">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(job)}
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(job.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
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
