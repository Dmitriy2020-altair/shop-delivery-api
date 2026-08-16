"use client";

import { useCallback, useState } from "react";
import { KeyRound, LogOut, Shield } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { ErrorState } from "@/components/states/ErrorState";
import { ProfileSkeleton } from "@/components/states/PageSkeletons";
import {
  UiStatePreview,
  type UiPreviewMode,
} from "@/components/states/UiStatePreview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMockResource } from "@/hooks/useMockResource";
import { mockProfile } from "@/lib/mock/profile";

export function ProfileView() {
  const [preview, setPreview] = useState<UiPreviewMode>("live");
  const loadProfile = useCallback(() => mockProfile, []);
  const resource = useMockResource({ load: loadProfile });

  const showLoading =
    preview === "loading" || (preview === "live" && resource.status === "loading");
  const showError =
    preview === "error" || (preview === "live" && resource.status === "error");
  const profile = resource.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <UiStatePreview
          value={preview}
          onChange={setPreview}
          includeEmpty={false}
        />
      </div>

      {showLoading ? <ProfileSkeleton /> : null}

      {showError && !showLoading ? (
        <ErrorState
          title="Failed to load profile"
          message={
            resource.error ??
            "Unable to load your profile right now. Please try again."
          }
          onRetry={() => {
            setPreview("live");
            resource.retry();
          }}
        />
      ) : null}

      {!showLoading && !showError && profile ? (
        <>
          <ProfileCard profile={profile} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-primary" aria-hidden />
                Security
              </CardTitle>
              <CardDescription>
                These controls are UI-only and do not call the API yet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <KeyRound className="size-3.5" aria-hidden />
                  Update password
                </Button>
              </div>

              <Separator />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sessions</p>
                  <p className="text-sm text-muted-foreground">
                    2 active sessions on trusted devices
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage sessions
                </Button>
              </div>

              <Separator />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Refresh tokens</p>
                  <p className="text-sm text-muted-foreground">
                    Revoke long-lived refresh tokens from this account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Review tokens
                </Button>
              </div>

              <Separator />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sign out</p>
                  <p className="text-sm text-muted-foreground">
                    End the current session on this device
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="gap-1.5">
                  <LogOut className="size-3.5" aria-hidden />
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
