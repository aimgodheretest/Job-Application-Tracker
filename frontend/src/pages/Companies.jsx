import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import CompanyTable from "../components/company/CompanyTable";
import CompanyForm from "../components/company/CompanyForm";
import CompanyFilters from "../components/company/CompanyFilters";

import Modal from "../components/common/Modal";
import DeleteModal from "../components/application/DeleteModal";
import Pagination from "../components/common/Pagination";

import toast from "react-hot-toast";

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../services/companyService";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [industryFilter, setIndustryFilter] = useState("");

  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCompanies();
  }, [page, debouncedSearch, industryFilter, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchCompanies() {
    try {
      setLoading(true);

      const response = await getCompanies({
        page,
        limit: 5,
        search: debouncedSearch,
        industry: industryFilter,
        sort,
      });

      setCompanies(response.companies || []);
      setPagination(response.pagination || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCompany(formData) {
    try {
      await createCompany(formData);

      toast.success("Company created successfully!");

      setEditingCompany(null);
      setIsModalOpen(false);

      setPage(1);

      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create company");
    }
  }

  function handleEdit(company) {
    setEditingCompany(company);
    setIsModalOpen(true);
  }

  async function handleUpdateCompany(formData) {
    try {
      await updateCompany(editingCompany.id, formData);

      toast.success("Company updated successfully!");

      setEditingCompany(null);
      setIsModalOpen(false);

      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update company");
    }
  }

  function handleDelete(id) {
    setDeleteId(id);
  }

  async function confirmDelete() {
    try {
      await deleteCompany(deleteId);

      toast.success("Company deleted successfully!");

      setDeleteId(null);

      fetchCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete company");
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>

          <p className="text-gray-500 mt-2">
            Manage the companies you're interested in.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCompany(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
        >
          + New Company
        </button>
      </div>

      <CompanyFilters
        search={search}
        setSearch={setSearch}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="bg-white rounded-xl shadow border p-6 animate-pulse">
          <div className="h-6 w-1/4 bg-gray-300 rounded mb-6"></div>

          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded mb-3"></div>
          ))}
        </div>
      ) : (
        <>
          <CompanyTable
            companies={companies}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setEditingCompany(null);
          setIsModalOpen(false);
        }}
        title={editingCompany ? "Edit Company" : "Add Company"}
      >
        <CompanyForm
          initialData={editingCompany}
          onCancel={() => {
            setEditingCompany(null);
            setIsModalOpen(false);
          }}
          onSubmit={editingCompany ? handleUpdateCompany : handleCreateCompany}
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
