export default function SavedJobFilters({
  statusFilter,
  setStatusFilter,
  jobTypeFilter,
  setJobTypeFilter,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Job Type</label>

          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="company_asc">Company A-Z</option>
            <option value="company_desc">Company Z-A</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>
      </div>
    </div>
  );
}
