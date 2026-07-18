export function getStatusBadge(status) {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-600";

    case "Interview":
      return "bg-yellow-100 text-yellow-700";

    case "Offer":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}
