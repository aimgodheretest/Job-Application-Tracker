import { useEffect, useState } from "react";

export default function CompanyForm({ onSubmit, initialData, onCancel }) {
  const defaultValues = {
    name: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
      {/* Company Name */}
      <div>
        <label className="block mb-2 font-medium">Company Name *</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      {/* Website */}
      <div>
        <label className="block mb-2 font-medium">Website</label>

        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Industry */}
      <div>
        <label className="block mb-2 font-medium">Industry</label>

        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Company Size */}
      <div>
        <label className="block mb-2 font-medium">Company Size</label>

        <input
          type="text"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          placeholder="e.g. 500-1000"
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

      {/* Contact Person */}
      <div>
        <label className="block mb-2 font-medium">Contact Person</label>

        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Contact Email */}
      <div>
        <label className="block mb-2 font-medium">Contact Email</label>

        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Contact Phone */}
      <div>
        <label className="block mb-2 font-medium">Contact Phone</label>

        <input
          type="text"
          name="contactPhone"
          value={formData.contactPhone}
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
          {initialData ? "Update Company" : "Save Company"}
        </button>
      </div>
    </form>
  );
}
