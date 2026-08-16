import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { mockProfile } from "@/lib/mock/profile";

type Profile = typeof mockProfile;

type ProfileCardProps = {
  profile: Profile;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar size="lg" className="size-14">
          <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
            {profile.initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-lg">{profile.email}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {profile.role}
            </Badge>
            <span>Member since {profile.memberSince}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Email
            </dt>
            <dd className="mt-1 text-sm font-medium">{profile.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Role
            </dt>
            <dd className="mt-1 text-sm font-medium capitalize">{profile.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Member since
            </dt>
            <dd className="mt-1 text-sm font-medium">{profile.memberSince}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
