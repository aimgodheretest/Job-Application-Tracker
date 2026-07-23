import { useRef, useState } from "react";
import { Camera, Trash2, Upload, Eye, FileText, MapPin } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../ui/Card";

import {
  uploadProfileImage,
  deleteProfileImage,
  uploadResume,
  deleteResume,
} from "../../services/profileService";

export default function ProfileSidebar({ profile, onRefresh }) {
  const imageRef = useRef(null);
  const resumeRef = useRef(null);

  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  const avatar = profile?.profileImage
    ? `${BASE_URL}/${profile.profileImage}`
    : null;

  const resume = profile?.resume ? `${BASE_URL}/${profile.resume}` : null;
  const resumeName = profile?.resume
    ? `${profile.name.replace(/\s+/g, "_")}_Resume.${profile.resume
        .split(".")
        .pop()}`
    : null;

  const initials = profile?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const formData = new FormData();
      formData.append("profileImage", file);

      await uploadProfileImage(formData);

      toast.success("Profile photo updated");

      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoadingImage(false);
    }
  }

  async function handleDeleteImage() {
    if (!confirm("Remove profile photo?")) return;

    try {
      setLoadingImage(true);

      await deleteProfileImage();

      toast.success("Profile photo removed");

      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoadingImage(false);
    }
  }

  async function handleResumeUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoadingResume(true);

      const formData = new FormData();
      formData.append("resume", file);

      await uploadResume(formData);

      toast.success("Resume uploaded");

      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoadingResume(false);
    }
  }

  async function handleDeleteResume() {
    if (!confirm("Delete resume?")) return;

    try {
      setLoadingResume(true);

      await deleteResume();

      toast.success("Resume removed");

      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoadingResume(false);
    }
  }

  return (
    <Card>
      <div className="flex flex-col items-center">
        {/* Avatar */}

        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="h-36 w-36 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        ) : (
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white shadow-md">
            {initials || "U"}
          </div>
        )}

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          {profile?.name}
        </h2>

        <p className="mt-1 text-center text-gray-500">
          {profile?.headline || "No headline added"}
        </p>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={16} />
          {profile?.location || "No location"}
        </div>

        {/* Photo */}

        <div className="mt-8 w-full border-t pt-6">
          <h3 className="font-semibold text-gray-900">Profile Photo</h3>

          <div className="mt-4 space-y-3">
            <button
              onClick={() => imageRef.current.click()}
              disabled={loadingImage}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 transition hover:bg-gray-100"
            >
              <Camera size={18} />
              Change Photo
            </button>

            {avatar && (
              <button
                onClick={handleDeleteImage}
                disabled={loadingImage}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 px-4 py-3 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={18} />
                Remove Photo
              </button>
            )}

            <input
              hidden
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Resume */}

        <div className="mt-8 w-full border-t pt-6">
          <h3 className="font-semibold text-gray-900">Resume</h3>

          <div className="mt-3 flex items-center gap-2 text-gray-600">
            <FileText size={18} />

            <span
              className="truncate max-w-[220px]"
              title={resumeName || "No resume uploaded"}
            >
              {resumeName || "No resume uploaded"}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <button
              onClick={() => resumeRef.current.click()}
              disabled={loadingResume}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 transition hover:bg-gray-100"
            >
              <Upload size={18} />
              Upload Resume
            </button>

            {resume && (
              <>
                <a
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300 px-4 py-3 text-blue-600 transition hover:bg-blue-50"
                >
                  <Eye size={18} />
                  View Resume
                </a>

                <button
                  onClick={handleDeleteResume}
                  disabled={loadingResume}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 px-4 py-3 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Delete Resume
                </button>
              </>
            )}

            <input
              hidden
              ref={resumeRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
