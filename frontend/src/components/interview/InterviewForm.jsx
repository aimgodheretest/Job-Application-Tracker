import { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";

export default function InterviewForm({ onSubmit, initialData, onCancel }) {
  const defaultValues = {
    applicationId: "",
    round: "HR",
    date: "",
    time: "",
    mode: "Online",
    location: "",
    meetingLink: "",
    interviewer: "",
    status: "Scheduled",
    feedback: "",
    notes: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        applicationId: initialData.applicationId || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
      });
    } else {
      setFormData(defaultValues);
    }
  }, [initialData]);

  async function fetchApplications() {
    try {
      const response = await getApplications({
        limit: 100,
      });

      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit(formData);

    if (!initialData) {
      setFormData(defaultValues);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Application */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Application *</label>

        <select
          name="applicationId"
          value={formData.applicationId}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        >
          <option value="">Select Application</option>

          {applications.map((application) => (
            <option key={application.id} value={application.id}>
              {application.company} - {application.position}
            </option>
          ))}
        </select>
      </div>

      {/* Round */}
      <div>
        <label className="block mb-2 font-medium">Interview Round</label>

        <select
          name="round"
          value={formData.round}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>HR</option>
          <option>Technical</option>
          <option>Managerial</option>
          <option>Final</option>
          <option>Other</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium">Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Cancelled</option>
          <option>Rescheduled</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block mb-2 font-medium">Interview Date *</label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      {/* Time */}
      <div>
        <label className="block mb-2 font-medium">Interview Time *</label>

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      {/* Mode */}
      <div>
        <label className="block mb-2 font-medium">Mode</label>

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Online</option>
          <option>Offline</option>
          <option>Phone</option>
        </select>
      </div>

      {/* Interviewer */}
      <div>
        <label className="block mb-2 font-medium">Interviewer</label>

        <input
          type="text"
          name="interviewer"
          value={formData.interviewer}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Meeting Link */}
      <div>
        <label className="block mb-2 font-medium">Meeting Link</label>

        <input
          type="url"
          name="meetingLink"
          value={formData.meetingLink}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-2 font-medium">Location</label>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Feedback */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Feedback</label>

        <textarea
          rows="3"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Notes</label>

        <textarea
          rows="4"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div className="md:col-span-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          {initialData ? "Update Interview" : "Schedule Interview"}
        </button>
      </div>
    </form>
  );
}
