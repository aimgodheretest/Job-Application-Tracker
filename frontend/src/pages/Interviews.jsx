import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} from "../services/interviewService";

import InterviewForm from "../components/interview/InterviewForm";
import InterviewTable from "../components/interview/InterviewTable";
import InterviewFilters from "../components/interview/InterviewFilters";

import Modal from "../components/common/Modal";
import DeleteModal from "../components/application/DeleteModal";
import Pagination from "../components/common/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import { useSearch } from "../context/SearchContext";

export default function Interviews() {
  const { searchQuery } = useSearch();
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingInterview, setEditingInterview] = useState(null);

  const [deleteInterviewData, setDeleteInterviewData] = useState(null);

  const [pagination, setPagination] = useState({});
  const defaultFilters = {
    page: 1,
    limit: 5,
    search: "",
    status: "",
    mode: "",
    round: "",
    dateFrom: "",
    dateTo: "",
    sort: "newest",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch]);
  
  async function fetchInterviews() {
    try {
      setLoading(true);

      const response = await getInterviews(filters);

      setInterviews(response.data.interviews);

      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load interviews.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      await createInterview(data);

      toast.success("Interview scheduled successfully.");

      setShowModal(false);

      fetchInterviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

  async function handleUpdate(data) {
    try {
      await updateInterview(editingInterview.id, data);

      toast.success("Interview updated successfully.");

      setEditingInterview(null);

      setShowModal(false);

      fetchInterviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

  async function handleDelete() {
    try {
      await deleteInterview(deleteInterviewData.id);

      toast.success("Interview deleted successfully.");

      setDeleteInterviewData(null);

      fetchInterviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  }

  function openCreateModal() {
    setEditingInterview(null);

    setShowModal(true);
  }

  function openEditModal(interview) {
    setEditingInterview(interview);

    setShowModal(true);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Interviews</h1>

            <p className="text-gray-500">Manage all scheduled interviews</p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Schedule Interview
          </button>
        </div>

        <InterviewFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            Loading...
          </div>
        ) : (
          <InterviewTable
            interviews={interviews}
            onEdit={openEditModal}
            onDelete={setDeleteInterviewData}
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

        {/* Create / Edit */}

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingInterview(null);
          }}
          title={editingInterview ? "Update Interview" : "Schedule Interview"}
        >
          <InterviewForm
            initialData={editingInterview}
            onSubmit={editingInterview ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowModal(false);
              setEditingInterview(null);
            }}
          />
        </Modal>

        {/* Delete */}

        <DeleteModal
          isOpen={!!deleteInterviewData}
          onClose={() => setDeleteInterviewData(null)}
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
