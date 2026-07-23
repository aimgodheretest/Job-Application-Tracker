import { Briefcase, CalendarCheck, Bookmark } from "lucide-react";

import Card from "../ui/Card";

const icons = {
  Application: Briefcase,
  Interview: CalendarCheck,
  "Saved Job": Bookmark,
};

const colors = {
  Application: "bg-blue-100 text-blue-600",
  Interview: "bg-purple-100 text-purple-600",
  "Saved Job": "bg-orange-100 text-orange-600",
};

export default function RecentActivity({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-semibold mb-6 dark:text-white">
          Recent Activity
        </h2>

        <div className="h-48 flex items-center justify-center text-slate-500 dark:text-slate-400">
          No recent activity available.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {data.map((activity, index) => {
          const Icon = icons[activity.type];

          return (
            <div key={index} className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${colors[activity.type]}`}>
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold dark:text-white">
                  {activity.title}
                </h3>

                <p className="text-sm text-slate-500">{activity.subtitle}</p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(activity.date).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
