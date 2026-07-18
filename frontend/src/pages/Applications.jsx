import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicationTable from "../components/applications/ApplicationTable";
import { getApplications } from "../services/applicationService";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      setLoading(true);

      const response = await getApplications();

      setApplications(response.data.applications);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>

          <p className="text-gray-500 mt-2">
            Track and manage your job applications.
          </p>
        </div>
      </div>

      <ApplicationTable
        applications={applications}
        loading={loading}
        pagination={pagination}
      />
    </DashboardLayout>
  );
}
