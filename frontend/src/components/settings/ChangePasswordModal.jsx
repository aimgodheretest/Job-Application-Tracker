import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import Modal from "../common/Modal";
import Button from "../ui/Button";
import { changePassword } from "../../services/settingsService";

export default function ChangePasswordModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function togglePassword(field) {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  function resetForm() {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });
  }

  function handleClose() {
    if (loading) return;

    resetForm();
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.currentPassword.trim()) {
      return toast.error("Current password is required");
    }

    if (!form.newPassword.trim()) {
      return toast.error("New password is required");
    }

    if (!form.confirmPassword.trim()) {
      return toast.error("Confirm password is required");
    }

    if (form.newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await changePassword(form);

      toast.success(res.message);

      resetForm();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={open} onClose={handleClose} title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">Current Password</label>

          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => togglePassword("current")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">New Password</label>

          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">Confirm Password</label>

          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={
            !form.currentPassword || !form.newPassword || !form.confirmPassword
          }
        >
          Update Password
        </Button>
      </form>
    </Modal>
  );
}
