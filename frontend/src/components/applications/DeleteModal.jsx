import { TriangleAlert } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <TriangleAlert className="text-red-600" size={36} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          Delete Application?
        </h2>

        <p className="text-gray-500 text-center mt-3">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="border rounded-lg px-5 py-2">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
