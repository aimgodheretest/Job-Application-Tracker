export default function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        w-full
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        active:scale-[0.98]
        transition-all
        duration-200
        py-3
        text-white
        font-semibold
        shadow-lg
        shadow-blue-500/20
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
  