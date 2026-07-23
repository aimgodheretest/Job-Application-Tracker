const statusConfig = {
  // Applications
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",

  // Saved Jobs
  Saved: "bg-sky-100 text-sky-700",
  Archived: "bg-gray-100 text-gray-700",

  // Interviews
  Scheduled: "bg-indigo-100 text-indigo-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",

  // Reminders
  Pending: "bg-amber-100 text-amber-700",
  Missed: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  const color = statusConfig[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      {status}
    </span>
  );
}
