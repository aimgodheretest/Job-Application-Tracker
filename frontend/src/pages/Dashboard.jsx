import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Briefcase, Clock3, BadgeCheck, CircleX } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";

import { getDashboardData } from "../services/dashboardService";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalApplications: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    },
    recentApplications: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardData();

        setDashboardData(data.data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Failed to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  const { stats, recentApplications } = dashboardData;

  return (
    <DashboardLayout>
      <WelcomeBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        <StatsCard
          title="Applications"
          value={stats.totalApplications}
          color="text-blue-600"
          icon={Briefcase}
        />

        <StatsCard
          title="Applied"
          value={stats.applied}
          color="text-indigo-600"
          icon={Clock3}
        />

        <StatsCard
          title="Interview"
          value={stats.interview}
          color="text-green-600"
          icon={BadgeCheck}
        />

        <StatsCard
          title="Offer"
          value={stats.offer}
          color="text-purple-600"
          icon={BadgeCheck}
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          color="text-red-600"
          icon={CircleX}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RecentApplications applications={recentApplications} />

        <UpcomingInterviews />
      </div>
    </DashboardLayout>
  );
}
