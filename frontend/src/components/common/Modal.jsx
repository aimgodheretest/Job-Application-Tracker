import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
