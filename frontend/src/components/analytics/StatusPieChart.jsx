import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../ui/Card";

const COLORS = [
  "#3B82F6", // Applied
  "#A855F7", // Interview
  "#22C55E", // Offer
  "#EF4444", // Rejected
];

export default function StatusPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h2 className="mb-4 text-xl font-semibold dark:text-white">
          Application Status
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-500 dark:text-slate-400">
          No application data available.
        </div>
      </Card>
    );
  }
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold dark:text-white">
        Application Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`${value} Applications`, "Count"]}
            />

            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
