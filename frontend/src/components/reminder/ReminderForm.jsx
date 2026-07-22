import { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";

export default function ReminderForm({ onSubmit, initialData, onCancel }) {
  const defaultValues = {
    applicationId: "",
    title: "",
    description: "",
    reminderDate: "",
    reminderTime: "",
    status: "Pending",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        applicationId: initialData.applicationId || "",
        title: initialData.title || "",
        description: initialData.description || "",
        reminderDate: initialData.reminderDate
          ? initialData.reminderDate.split("T")[0]
          : "",
        reminderTime: initialData.reminderTime || "",
        status: initialData.status || "Pending",
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

      {/* Title */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Reminder Title *</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Follow up with recruiter"
          required
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows="3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Add additional reminder details..."
        />
      </div>

      {/* Reminder Date */}
      <div>
        <label className="block mb-2 font-medium">Reminder Date *</label>

        <input
          type="date"
          name="reminderDate"
          value={formData.reminderDate}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      {/* Reminder Time */}
      <div>
        <label className="block mb-2 font-medium">Reminder Time *</label>

        <input
          type="time"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      {/* Status */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>
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
          {initialData ? "Update Reminder" : "Create Reminder"}
        </button>
      </div>
    </form>
  );
}
