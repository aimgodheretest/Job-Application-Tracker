import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Modal from "../common/Modal";
import Button from "../ui/Button";

import { deleteAccount } from "../../services/settingsService";
import { useAuth } from "../../context/AuthContext";

export default function DeleteAccountModal({ open, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  function handleClose() {
    if (loading) return;

    setPassword("");
    onClose();
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    try {
      setLoading(true);

      const res = await deleteAccount(password);

      toast.success(res.message);

      logout();

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={open} onClose={handleClose} title="Delete Account">
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-600" />

          <div>
            <p className="font-semibold text-red-700">
              This action cannot be undone.
            </p>

            <p className="mt-1 text-sm text-red-600">
              All your applications, interviews, reminders, companies and
              profile data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleDelete} className="space-y-5">
        <div className="space-y-2">
          <label className="font-medium">Confirm Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={!password}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete Account
        </Button>
      </form>
    </Modal>
  );
}
