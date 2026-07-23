import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SavedJobTable from "../components/savedJob/SavedJobTable";
import {
  getSavedJobs,
  createSavedJob,
  updateSavedJob,
  deleteSavedJob,
} from "../services/savedJobService";
import Modal from "../components/common/Modal";
import SavedJobForm from "../components/savedJob/SavedJobForm";
import DeleteModal from "../components/application/DeleteModal";
import SavedJobFilters from "../components/savedJob/SavedJobFilters";
import Pagination from "../components/common/Pagination";
import toast from "react-hot-toast";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSavedJob, setEditingSavedJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSavedJobs();
  }, [page, debouncedSearch, statusFilter, jobTypeFilter, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchSavedJobs() {
    try {
      setLoading(true);

      const response = await getSavedJobs({
        page,
        limit: 5,
        search: debouncedSearch,
        status: statusFilter,
        jobType: jobTypeFilter,
        sort,
      });

      setSavedJobs(response.data.savedJobs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch saved jobs");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateSavedJob(formData) {
    try {
      await createSavedJob(formData);

      toast.success("Saved job created successfully!");

      setIsModalOpen(false);
      setEditingSavedJob(null);
      setPage(1);

      await fetchSavedJobs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create saved job",
      );
    }
  }

  function handleEdit(savedJob) {
    setEditingSavedJob(savedJob);
    setIsModalOpen(true);
  }

  async function handleUpdateSavedJob(formData) {
    try {
      await updateSavedJob(editingSavedJob.id, formData);

      toast.success("Saved job updated successfully!");

      setEditingSavedJob(null);
      setIsModalOpen(false);

      await fetchSavedJobs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update saved job",
      );
    }
  }

  function handleDelete(id) {
    setDeleteId(id);
  }

  async function confirmDelete() {
    try {
      await deleteSavedJob(deleteId);

      toast.success("Saved job deleted successfully!");

      setDeleteId(null);

      await fetchSavedJobs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to delete saved job",
      );
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Saved Jobs</h1>

          <p className="text-gray-500 mt-2">
            Save jobs to apply later and manage your opportunities.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSavedJob(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          + Save Job
        </button>
      </div>

      <SavedJobFilters
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
          <SavedJobTable
            savedJobs={savedJobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingSavedJob(null);
          setIsModalOpen(false);
        }}
        title={editingSavedJob ? "Edit Saved Job" : "Save New Job"}
      >
        <SavedJobForm
          initialData={editingSavedJob}
          onCancel={() => {
            setEditingSavedJob(null);
            setIsModalOpen(false);
          }}
          onSubmit={
            editingSavedJob ? handleUpdateSavedJob : handleCreateSavedJob
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
