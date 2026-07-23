import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { updateProfile } from "../../services/profileService";

export default function ProfileForm({ profile, onRefresh, setSaving }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    headline: "",
    experience: "",
    careerGoal: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    bio: "",
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      headline: profile.headline || "",
      experience: profile.experience || "",
      careerGoal: profile.careerGoal || "",
      location: profile.location || "",
      linkedin: profile.linkedin || "",
      github: profile.github || "",
      portfolio: profile.portfolio || "",
      bio: profile.bio || "",
    });
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      toast.success("Profile updated successfully");

      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form id="profile-form" onSubmit={handleSubmit}>
      <Card>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h2>

          <p className="mt-1 text-gray-500">
            Keep your profile updated to improve your job search.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Professional Headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
          />

          <Input
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <Input
            label="Career Goal"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mt-10 border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Professional Links
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-6">
            <Input
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />

            <Input
              label="GitHub"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />

            <Input
              label="Portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-900">About</h3>

          <div className="mt-6">
            <label className="mb-2 block font-medium text-gray-700">Bio</label>

            <textarea
              name="bio"
              rows={6}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell recruiters something about yourself..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>
        </div>

        {/* Mobile Save Button */}

        <div className="mt-10 block md:hidden">
          <Button loading={false}>Save Changes</Button>
        </div>
      </Card>
    </form>
  );
}
