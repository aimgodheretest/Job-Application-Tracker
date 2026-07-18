export default function StatsCard({ title, value, color, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>{value}</h2>
        </div>

        {Icon && (
          <div className="bg-blue-50 p-3 rounded-xl">
            <Icon size={28} className="text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
}
