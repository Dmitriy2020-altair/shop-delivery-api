"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type UiPreviewMode = "live" | "loading" | "empty" | "error";

type UiStatePreviewProps = {
  value: UiPreviewMode;
  onChange: (value: UiPreviewMode) => void;
  includeEmpty?: boolean;
};

export function UiStatePreview({
  value,
  onChange,
  includeEmpty = true,
}: UiStatePreviewProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="ui-preview" className="whitespace-nowrap text-xs text-muted-foreground">
        UI preview
      </Label>
      <Select
        value={value}
        onValueChange={(next) => {
          if (
            next === "live" ||
            next === "loading" ||
            next === "empty" ||
            next === "error"
          ) {
            onChange(next);
          }
        }}
      >
        <SelectTrigger id="ui-preview" size="sm" className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="live">Live</SelectItem>
          <SelectItem value="loading">Loading</SelectItem>
          {includeEmpty ? <SelectItem value="empty">Empty</SelectItem> : null}
          <SelectItem value="error">Error</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
