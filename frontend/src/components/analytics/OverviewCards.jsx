import {
  Briefcase,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Bookmark,
} from "lucide-react";

import Card from "../ui/Card";

const cards = [
  {
    key: "applications",
    title: "Applications",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    key: "interviews",
    title: "Interviews",
    icon: CalendarCheck,
    color: "text-purple-600",
  },
  {
    key: "offers",
    title: "Offers",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    key: "rejected",
    title: "Rejected",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    key: "savedJobs",
    title: "Saved Jobs",
    icon: Bookmark,
    color: "text-orange-600",
  },
];

export default function OverviewCards({ overview }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map(({ key, title, icon: Icon, color }) => (
        <Card
          key={key}
          className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {title}
              </p>

              <h2 className="mt-2 text-3xl font-bold dark:text-white">
                {overview[key]}
              </h2>
            </div>

            <div
              className={`rounded-full bg-slate-100 dark:bg-slate-800 p-3 ${color}`}
            >
              <Icon size={28} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
