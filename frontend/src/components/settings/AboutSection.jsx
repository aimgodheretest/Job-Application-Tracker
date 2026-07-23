import {
  Code2,
  Database,
  FolderGit2,
  Shield,
  FileText,
  ExternalLink,
} from "lucide-react";
import Card from "../ui/Card";

export default function AboutSection() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">About</h2>

      <div className="space-y-4">
        <InfoRow title="Version" value="v1.0.0" />

        <InfoRow title="Developer" value="Murli Kumar" />

        <InfoRow
          icon={<Code2 size={18} />}
          title="Frontend"
          value="React + Tailwind CSS"
        />

        <InfoRow
          icon={<Database size={18} />}
          title="Backend"
          value="Node.js + Express"
        />

        <InfoRow title="Database" value="MySQL + Sequelize" />

        <InfoRow
          icon={<FolderGit2 size={18} />}
          title="GitHub Repository"
          isLink
          link="https://github.com/aimgodheretest"
        />

        <InfoRow
          icon={<Shield size={18} />}
          title="Privacy Policy"
          isLink
          link="/privacy-policy"
        />

        <InfoRow
          icon={<FileText size={18} />}
          title="Terms & Conditions"
          isLink
          link="/terms-and-conditions"
        />
      </div>
    </Card>
  );
}

function InfoRow({ icon, title, value, isLink, link }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      {isLink ? (
        <a
          href={link}
          target={link.startsWith("http") ? "_blank" : "_self"}
          rel="noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          Open
          <ExternalLink size={16} />
        </a>
      ) : (
        <span className="text-gray-500">{value}</span>
      )}
    </div>
  );
}
