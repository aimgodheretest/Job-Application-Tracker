import { useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { uploadDocument } from "../../services/documentService";

export default function DocumentUpload({ applicationId, onUploadSuccess }) {
  const [documentType, setDocumentType] = useState("Resume");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      toast.error("Please choose a file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("documentType", documentType);
      formData.append("document", file);

      await uploadDocument(applicationId, formData);

      toast.success("Document uploaded successfully!");

      setFile(null);
      setDocumentType("Resume");

      onUploadSuccess();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-5 bg-gray-50 space-y-4"
    >
      <h3 className="font-semibold text-lg">Upload Document</h3>

      <div>
        <label className="block mb-2 font-medium">Document Type</label>

        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option>Resume</option>
          <option>Cover Letter</option>
          <option>Offer Letter</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Choose File</label>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
      </div>

      {file && (
        <div className="text-sm text-gray-600">
          Selected: <strong>{file.name}</strong>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 disabled:opacity-60"
      >
        <Upload size={18} />

        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
