import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { getDocuments, deleteDocument } from "../../services/documentService";
import DocumentUpload from "./DocumentUpload";
import DeleteModal from "./DeleteModal";

export default function DocumentManager({ application }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (application) {
      fetchDocuments();
    }
  }, [application]);

  async function fetchDocuments() {
    try {
      setLoading(true);

      const response = await getDocuments(application.id);

      setDocuments(response.data);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(documentId) {
    setDeleteId(documentId);
  }

  async function confirmDelete() {
    try {
      await deleteDocument(deleteId);

      toast.success("Document deleted successfully!");

      setDeleteId(null);

      fetchDocuments();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete document");
    }
  }

  return (
    <div className="space-y-6">
      <DocumentUpload
        applicationId={application.id}
        onUploadSuccess={fetchDocuments}
      />

      <div>
        <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>

        {loading ? (
          <p>Loading...</p>
        ) : documents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No documents uploaded.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center border rounded-xl p-4 hover:shadow-sm transition"
              >
                <div>
                  <p className="font-medium">{doc.documentType}</p>

                  <p className="text-sm text-gray-500">{doc.originalName}</p>
                </div>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  title="Delete Document"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Document?"
        message="This document will be permanently removed from the system."
      />
    </div>
  );
}
