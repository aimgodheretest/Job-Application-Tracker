import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardAnalytics } from "../services/analyticsService";
import Loader from "../components/common/Loader";
import OverviewCards from "../components/analytics/OverviewCards";
import StatusPieChart from "../components/analytics/StatusPieChart";
import MonthlyApplicationsChart from "../components/analytics/MonthlyApplicationsChart";
import CompanyDistributionChart from "../components/analytics/CompanyDistributionChart";
import RecentActivity from "../components/analytics/RecentActivity";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const data = await getDashboardAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold dark:text-white">
          Analytics Dashboard
        </h1>

        <OverviewCards overview={analytics.overview} />
        <div className="grid gap-6 lg:grid-cols-2">
          <StatusPieChart data={analytics.statusDistribution} />

          <MonthlyApplicationsChart data={analytics.monthlyApplications} />
          <CompanyDistributionChart data={analytics.companyDistribution} />
          <RecentActivity data={analytics.recentActivity} />
        </div>
      </div>
    </DashboardLayout>
  );
}
