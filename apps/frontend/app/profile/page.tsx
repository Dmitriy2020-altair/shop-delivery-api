import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProfileView } from "@/components/ProfileView";
import { RequireAuth } from "@/components/RequireAuth";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div className="space-y-6">
        <PageHeader
          title="Profile"
          description="Account overview with static demo data for UI review."
        />
        <ProfileView />
      </div>
    </RequireAuth>
  );
}
