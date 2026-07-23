import { LogOut, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  const avatar = user?.profileImage ? `${BASE_URL}/${user.profileImage}` : null;

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      {/* Search */}

      <div className="hidden md:flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-2 w-full max-w-md">
        <Search size={18} className="text-gray-500" />

        <input
          placeholder="Search..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* Right */}

      <div className="ml-auto flex items-center gap-6">
        <button className="rounded-full p-2 transition hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <div
          onClick={() => navigate("/profile")}
          className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100"
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="h-11 w-11 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {initials}
            </div>
          )}

          <div className="hidden lg:block">
            <p className="font-semibold text-gray-900">{user?.name}</p>

            <p className="text-xs text-gray-500">
              {user?.headline || "Job Seeker"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
