export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
      <p className="text-sm text-gray-500">
        Showing page{" "}
        <span className="font-semibold">{pagination.currentPage}</span> of{" "}
        <span className="font-semibold">{pagination.totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => onPageChange(pagination.currentPage - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Previous
        </button>

        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`w-10 h-10 rounded-lg ${
              pagination.currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.currentPage + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
