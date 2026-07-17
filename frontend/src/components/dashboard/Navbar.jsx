import { LogOut, Bell, Search, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <header className="bg-white border-b px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3 border rounded-xl px-4 py-2 w-96">
        <Search size={18} />

        <input placeholder="Search..." className="outline-none w-full" />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">
          <UserCircle2 size={34} />
          <span className="font-medium">{user?.name}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
