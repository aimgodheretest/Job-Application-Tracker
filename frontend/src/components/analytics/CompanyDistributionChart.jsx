import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../ui/Card";

export default function CompanyDistributionChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h2 className="mb-4 text-xl font-semibold dark:text-white">
          Company Distribution
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-500 dark:text-slate-400">
          No company data available.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold dark:text-white">
        Company Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="company" />

            <YAxis allowDecimals={false} />

            <Tooltip
              formatter={(value) => [`${value} Applications`, "Count"]}
            />

            <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
