import DashboardLayout from "../layouts/DashboardLayout";

import SettingsHeader from "../components/settings/SettingsHeader";
import AccountSection from "../components/settings/AccountSection";
import AboutSection from "../components/settings/AboutSection";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsHeader />

        <AccountSection />

        <AboutSection />
      </div>
    </DashboardLayout>
  );
}
