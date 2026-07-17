export default function Card({ children }) {
  return (
    <div className="relative z-20 rounded-3xl bg-white shadow-xl border border-gray-100 p-8">
      {children}
    </div>
  );
}
