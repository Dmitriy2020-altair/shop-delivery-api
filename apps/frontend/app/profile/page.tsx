import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted">
          Account details will be loaded from the Express API later.
        </p>
      </div>

      <dl className="max-w-lg space-y-4 rounded-lg border border-border bg-white p-5">
        <div>
          <dt className="text-sm text-muted">Email</dt>
          <dd className="mt-1 font-medium">—</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Role</dt>
          <dd className="mt-1 font-medium">—</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Created at</dt>
          <dd className="mt-1 font-medium">—</dd>
        </div>
      </dl>
    </div>
  );
}
