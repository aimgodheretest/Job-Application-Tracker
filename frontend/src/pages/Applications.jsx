import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicationTable from "../components/application/ApplicationTable";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";
import Modal from "../components/common/Modal";
import ApplicationForm from "../components/application/ApplicationForm";
import DeleteModal from "./../components/application/DeleteModal";
import ApplicationFilters from "../components/application/ApplicationFilters";
import Pagination from "../components/common/Pagination";
import toast from "react-hot-toast";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchApplications();
  }, [page, debouncedSearch, statusFilter, jobTypeFilter, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchApplications() {
    try {
      setLoading(true);

      const response = await getApplications({
        page,
        limit: 5,
        search: debouncedSearch,
        status: statusFilter,
        jobType: jobTypeFilter,
        sort,
      });

      setApplications(response.data.applications);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleCreateApplication(formData) {
    try {
      await createApplication(formData);

      toast.success("Application created successfully!");

      setIsModalOpen(false);
      setEditingApplication(null);

      // Show the latest application on the first page
      setPage(1);

      await fetchApplications();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to create application",
      );
    }
  }

  function handleEdit(application) {
    setEditingApplication(application);
    setIsModalOpen(true);
  }

  async function handleUpdateApplication(formData) {
    try {
      await updateApplication(editingApplication.id, formData);

      toast.success("Application updated successfully!");

      setEditingApplication(null);
      setIsModalOpen(false);

      await fetchApplications();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update application",
      );
    }
  }

  function handleDelete(id) {
    setDeleteId(id);
  }

  async function confirmDelete() {
    try {
      await deleteApplication(deleteId);

      toast.success("Application deleted successfully!");

      setDeleteId(null);

      await fetchApplications();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to delete application",
      );
    }
  }
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>

          <p className="text-gray-500 mt-2">
            Track and manage your job applications.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingApplication(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          + New Application
        </button>
      </div>
      <ApplicationFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        jobTypeFilter={jobTypeFilter}
        setJobTypeFilter={setJobTypeFilter}
        sort={sort}
        setSort={setSort}
      />
      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border p-6 animate-pulse">
          <div className="h-6 w-1/4 bg-gray-300 rounded mb-6"></div>

          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded mb-3"></div>
          ))}
        </div>
      ) : (
        <>
          <ApplicationTable
            applications={applications}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingApplication(null);
          setIsModalOpen(false);
        }}
        title={editingApplication ? "Edit Application" : "Add New Application"}
      >
        <ApplicationForm
          initialData={editingApplication}
          onCancel={() => {
            setEditingApplication(null);
            setIsModalOpen(false);
          }}
          onSubmit={
            editingApplication
              ? handleUpdateApplication
              : handleCreateApplication
          }
        />
      </Modal>
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
