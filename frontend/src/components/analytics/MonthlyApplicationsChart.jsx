import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

export default function MonthlyApplicationsChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h2 className="mb-4 text-xl font-semibold dark:text-white">
          Monthly Applications
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-500 dark:text-slate-400">
          No monthly application data available.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold dark:text-white">
        Monthly Applications
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip
              formatter={(value) => [`${value} Applications`, "Count"]}
            />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
