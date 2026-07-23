import Button from "../ui/Button";

export default function ProfileHeader({ saving, onSave }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>

        <p className="mt-2 text-gray-500">
          Manage your personal information, professional details, profile photo,
          and resume.
        </p>
      </div>

      <div className="w-full md:w-auto">
        <Button
          type="button"
          onClick={onSave}
          loading={saving}
          className="md:w-auto px-8"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
