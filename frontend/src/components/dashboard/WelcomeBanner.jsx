import { BriefcaseBusiness } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function WelcomeBanner() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || "User"} 
          </h1>

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
