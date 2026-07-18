import { getStatusBadge } from "../../utils/statusBadge";

export default function RecentApplications({ applications = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-5">Recent Applications</h2>

      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div>
                <h3 className="font-semibold">{item.company}</h3>

                <p className="text-sm text-gray-500">{item.position}</p>
              </div>

              <span
                className={`text-sm px-3 py-1 rounded-full ${getStatusBadge(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
}
