import { useEffect, useState } from "react";
import { getUpcomingInterviews } from "../../services/interviewService";

export default function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingInterviews();
  }, []);

  async function fetchUpcomingInterviews() {
    try {
      setLoading(true);

      const response = await getUpcomingInterviews();

      setInterviews(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(":");

    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-5">Upcoming Interviews</h2>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : interviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming interviews.</p>
      ) : (
        <div className="space-y-5">
          {interviews.map((item) => (
            <div key={item.id}>
              <h3 className="font-semibold">
                {item.application?.company || "Unknown Company"}
              </h3>

              <p className="text-gray-500 text-sm">
                {formatDate(item.date)} • {formatTime(item.time)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
