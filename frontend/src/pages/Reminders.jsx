import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  markReminderCompleted,
} from "../services/reminderService";

import ReminderForm from "../components/reminder/ReminderForm";
import ReminderTable from "../components/reminder/ReminderTable";
import ReminderFilters from "../components/reminder/ReminderFilters";

import Modal from "../components/common/Modal";
import DeleteModal from "../components/application/DeleteModal";
import Pagination from "../components/common/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingReminder, setEditingReminder] = useState(null);

  const [deleteReminderData, setDeleteReminderData] = useState(null);

  const [pagination, setPagination] = useState({});

  const defaultFilters = {
    page: 1,
    limit: 5,
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    sort: "newest",
  };

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    fetchReminders();
  }, [filters]);

  async function fetchReminders() {
    try {
      setLoading(true);

      const response = await getReminders(filters);

      setReminders(response.data.reminders);

      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load reminders.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      await createReminder(data);

      toast.success("Reminder created successfully.");

      setShowModal(false);

      fetchReminders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

  async function handleUpdate(data) {
    try {
      await updateReminder(editingReminder.id, data);

      toast.success("Reminder updated successfully.");

      setEditingReminder(null);

      setShowModal(false);

      fetchReminders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

  async function handleDelete() {
    try {
      await deleteReminder(deleteReminderData.id);

      toast.success("Reminder deleted successfully.");

      setDeleteReminderData(null);

      fetchReminders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  }

  async function handleComplete(reminder) {
    try {
      await markReminderCompleted(reminder.id);

      toast.success("Reminder marked as completed.");

      fetchReminders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

  function openCreateModal() {
    setEditingReminder(null);

    setShowModal(true);
  }

  function openEditModal(reminder) {
    setEditingReminder(reminder);

    setShowModal(true);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reminders</h1>

            <p className="text-gray-500">Manage all job reminders</p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Create Reminder
          </button>
        </div>

        <ReminderFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            Loading...
          </div>
        ) : (
          <ReminderTable
            reminders={reminders}
            onEdit={openEditModal}
            onDelete={setDeleteReminderData}
            onComplete={handleComplete}
          />
        )}

        {!loading && pagination.totalPages > 1 && (
          <Pagination
            pagination={pagination}
            onPageChange={(page) =>
              setFilters((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        )}

        {/* Create / Update */}

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingReminder(null);
          }}
          title={editingReminder ? "Update Reminder" : "Create Reminder"}
        >
          <ReminderForm
            initialData={editingReminder}
            onSubmit={editingReminder ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowModal(false);
              setEditingReminder(null);
            }}
          />
        </Modal>

        {/* Delete */}

        <DeleteModal
          isOpen={!!deleteReminderData}
          onClose={() => setDeleteReminderData(null)}
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
