export default function InterviewFilters({ filters, onChange, onReset }) {
  function handleChange(e) {
    const { name, value } = e.target;

    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Rescheduled">Rescheduled</option>
          </select>
        </div>

        {/* Mode */}
        <div>
          <label className="block mb-2 font-medium">Mode</label>

          <select
            name="mode"
            value={filters.mode}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        {/* Round */}
        <div>
          <label className="block mb-2 font-medium">Round</label>

          <select
            name="round"
            value={filters.round}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
            <option value="Managerial">Managerial</option>
            <option value="Final">Final</option>
            <option value="Other">Other</option>
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
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            type="button"
            className="w-full border rounded-lg py-2 hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
