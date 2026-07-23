import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";

import { getProfile } from "../services/profileService";

export default function Profile() {
  const { updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);

      const res = await getProfile();

      setProfile(res.profile);

      // Sync navbar & localStorage
      updateUser(res.profile);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
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
        <ProfileHeader
          saving={saving}
          onSave={() =>
            document.getElementById("profile-form")?.requestSubmit()
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <ProfileSidebar profile={profile} onRefresh={fetchProfile} />
          </div>

          <div className="xl:col-span-2">
            <ProfileForm
              profile={profile}
              onRefresh={fetchProfile}
              setSaving={setSaving}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
