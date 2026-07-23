import {
  LayoutDashboard,
  Briefcase,
  Building2,
  CalendarDays,
  Bell,
  Settings,
  Bookmark,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Applications",
      icon: Briefcase,
      path: "/applications",
    },
    {
      name: "Saved Jobs",
      icon: Bookmark,
      path: "/saved-jobs",
    },
    {
      name: "Companies",
      icon: Building2,
      path: "/companies",
    },
    {
      name: "Interviews",
      icon: CalendarDays,
      path: "/interviews",
    },
    {
      name: "Reminders",
      icon: Bell,
      path: "/reminders",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">JobTracker</h1>
      </div>

      <nav className="flex-1 mt-6 px-3">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-blue-50"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
