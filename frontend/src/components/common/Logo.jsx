import { BriefcaseBusiness } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
        h-12
        w-12
        rounded-xl
        bg-blue-600
        flex
        items-center
        justify-center
        "
      >
        <BriefcaseBusiness size={26} color="white" />
      </div>

      <div>
        <h1 className="font-bold text-xl">Job Tracker</h1>

        <p className="text-sm text-gray-500">Track Every Opportunity</p>
      </div>
    </div>
  );
}
