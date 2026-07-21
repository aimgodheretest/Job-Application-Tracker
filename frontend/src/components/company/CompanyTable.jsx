import { Pencil, Trash2 } from "lucide-react";

export default function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3">Company</th>
            <th className="text-left px-6 py-3">Industry</th>
            <th className="text-left px-6 py-3">Location</th>
            <th className="text-left px-6 py-3">Contact</th>
            <th className="text-left px-6 py-3">Website</th>
            <th className="text-center px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-16">
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-3">🏢</div>

                  <h3 className="font-semibold text-lg">No companies found</h3>

                  <p className="text-gray-500 mt-2">
                    Add your first company to start tracking it.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <tr key={company.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{company.name}</td>

                <td className="px-6 py-4">{company.industry || "-"}</td>

                <td className="px-6 py-4">{company.location || "-"}</td>

                <td className="px-6 py-4">{company.contactPerson || "-"}</td>

                <td className="px-6 py-4">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(company)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(company.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
