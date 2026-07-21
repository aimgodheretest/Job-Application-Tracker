import { useState, useEffect } from "react";

export default function ApplicationForm({ onSubmit, initialData, onCancel }) {
  const defaultValues = {
    company: "",
    position: "",
    location: "",
    jobType: "Full-time",
    status: "Applied",
    salary: "",
    appliedDate: "",
    jobUrl: "",
    notes: "",
  };

  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appliedDate: initialData.appliedDate
          ? initialData.appliedDate.split("T")[0]
          : "",
      });
    } else {
      setFormData(defaultValues);
    }
  }, [initialData]);

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
      <div>
        <label className="block mb-2 font-medium">Company *</label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Position *</label>

        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Location *</label>

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Job Type</label>

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Expected Salary</label>

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Applied Date *</label>

        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Job URL</label>

        <input
          type="url"
          name="jobUrl"
          value={formData.jobUrl}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

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
          {initialData ? "Update Application" : "Save Application"}
        </button>
      </div>
    </form>
  );
}
