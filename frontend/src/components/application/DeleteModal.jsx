import { TriangleAlert } from "lucide-react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <TriangleAlert className="text-red-600" size={36} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-5 dark:text-white">
          {title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-center mt-3">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="border rounded-lg px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
