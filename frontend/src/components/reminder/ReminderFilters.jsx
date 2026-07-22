export default function ReminderFilters({ filters, onChange, onReset }) {
  function handleChange(e) {
    const { name, value } = e.target;

    onChange({
      ...filters,
      [name]: value,
      page: 1,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block mb-2 font-medium">Search</label>

          <input
            type="text"
            name="search"
            placeholder="Reminder title..."
            value={filters.search}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">Status</label>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Date From */}
        <div>
          <label className="block mb-2 font-medium">Date From</label>

          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block mb-2 font-medium">Date To</label>

          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block mb-2 font-medium">Sort</label>

          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title_asc">Title A-Z</option>
            <option value="title_desc">Title Z-A</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full border rounded-lg py-2 hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
