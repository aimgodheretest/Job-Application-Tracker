import { BriefcaseBusiness } from "lucide-react";

export default function WelcomeBanner() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name} 👋</h1>

          <p className="mt-2 text-blue-100">
            Keep applying consistently. Every application brings you closer to
            your next opportunity.
          </p>
        </div>

        <BriefcaseBusiness size={60} className="opacity-80" />
      </div>
    </div>
  );
}
