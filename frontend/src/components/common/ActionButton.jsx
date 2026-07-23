import { SquarePen, Trash2, Paperclip, CheckCircle2 } from "lucide-react";

const variants = {
  edit: {
    icon: SquarePen,
    className: "text-amber-600 hover:text-amber-700 hover:bg-amber-100",
    title: "Edit",
  },

  delete: {
    icon: Trash2,
    className: "text-red-600 hover:text-red-700 hover:bg-red-100",
    title: "Delete",
  },

  document: {
    icon: Paperclip,
    className: "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100",
    title: "Documents",
  },

  complete: {
    icon: CheckCircle2,
    className: "text-green-600 hover:text-green-700 hover:bg-green-100",
    title: "Complete",
  },
};

export default function ActionButton({
  type,
  onClick,
  disabled = false,
  size = 18,
}) {
  const variant = variants[type];

  if (!variant) return null;

  const Icon = variant.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={variant.title}
      className={`
        p-2
        rounded-lg
        transition-all
        duration-200
        ${variant.className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <Icon size={size} />
    </button>
  );
}
