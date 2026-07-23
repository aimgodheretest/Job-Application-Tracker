import DashboardLayout from "../layouts/DashboardLayout";

export default function TermsAndConditions() {
  return (
    <DashboardLayout>
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="text-gray-600 leading-8">
          By using this application, you agree to use it responsibly. This
          project is intended to help users organize and manage their job search
          process. Users are responsible for the information they upload and
          maintain.
        </p>
      </div>
    </DashboardLayout>
  );
}
