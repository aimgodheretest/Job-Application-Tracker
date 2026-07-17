import DashboardLayout from "../layouts/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <WelcomeBanner />

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <StatsCard title="Applications" value="18" color="text-blue-600" />

        <StatsCard title="Interviews" value="6" color="text-green-600" />

        <StatsCard title="Offers" value="2" color="text-purple-600" />

        <StatsCard title="Rejected" value="5" color="text-red-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RecentApplications />

        <UpcomingInterviews />
      </div>
    </DashboardLayout>
  );
}
