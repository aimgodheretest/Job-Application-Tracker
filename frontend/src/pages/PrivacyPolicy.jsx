import DashboardLayout from "../layouts/DashboardLayout";

export default function PrivacyPolicy() {
  return (
    <DashboardLayout>
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-gray-600 leading-8">
          Your data is securely stored and used only to provide job tracking,
          reminders, profile management, and analytics within this application.
          We do not sell or share your personal information with third parties.
        </p>
      </div>
    </DashboardLayout>
  );
}
