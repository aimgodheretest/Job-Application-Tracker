import {
  LayoutDashboard,
  Briefcase,
  Building2,
  CalendarDays,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Applications", icon: Briefcase },
    { name: "Companies", icon: Building2 },
    { name: "Interviews", icon: CalendarDays },
    { name: "Settings", icon: Settings },
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
            <button
              key={item.name}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              <Icon size={20} />

              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
