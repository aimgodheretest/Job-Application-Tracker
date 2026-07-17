export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="font-medium text-gray-700">{label}</label>}

      <input
        className={`
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          ${className}
        `}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
