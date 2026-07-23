import { useState } from "react";
import { Lock, Trash2, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { useAuth } from "../../context/AuthContext";

export default function AccountSection() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <Card>
        <h2 className="mb-6 text-xl font-semibold">Account</h2>

        <div className="divide-y">
          {/* Change Password */}

          <button
            onClick={() => setPasswordModal(true)}
            className="flex w-full items-center justify-between rounded-xl px-2 py-5 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <Lock className="text-blue-600" />

              <div className="text-left">
                <p className="font-medium">Change Password</p>

                <p className="text-sm text-gray-500">
                  Update your account password.
                </p>
              </div>
            </div>

            <ChevronRight />
          </button>

          {/* Delete */}

          <button
            onClick={() => setDeleteModal(true)}
            className="flex w-full items-center justify-between rounded-xl px-2 py-5 transition hover:bg-red-50"
          >
            <div className="flex items-center gap-4">
              <Trash2 className="text-red-600" />

              <div className="text-left">
                <p className="font-medium text-red-600">Delete Account</p>

                <p className="text-sm text-gray-500">
                  Permanently delete your account.
                </p>
              </div>
            </div>

            <ChevronRight />
          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-between rounded-xl px-2 py-5 transition hover:bg-orange-50"
          >
            <div className="flex items-center gap-4">
              <LogOut className="text-orange-500" />

              <div className="text-left">
                <p className="font-medium">Logout</p>

                <p className="text-sm text-gray-500">
                  Sign out of your account.
                </p>
              </div>
            </div>

            <ChevronRight />
          </button>
        </div>
      </Card>

      <ChangePasswordModal
        open={passwordModal}
        onClose={() => setPasswordModal(false)}
      />

      <DeleteAccountModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      />
    </>
  );
}
