export default function CompanyFilters({
  industryFilter,
  setIndustryFilter,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Industry */}
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name_asc">Company A-Z</option>
          <option value="name_desc">Company Z-A</option>
        </select>
      </div>
    </div>
  );
}
