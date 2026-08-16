"use client";

import { useCallback, useEffect, useState } from "react";

export type ResourceStatus = "loading" | "error" | "success";

type UseMockResourceOptions<T> = {
  load: () => T;
  delayMs?: number;
};

type ResourceState<T> = {
  status: ResourceStatus;
  data: T | null;
  error: string | null;
};

export function useMockResource<T>({
  load,
  delayMs = 650,
}: UseMockResourceOptions<T>) {
  const [requestId, setRequestId] = useState(0);
  const [state, setState] = useState<ResourceState<T>>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (cancelled) return;

      try {
        setState({
          status: "success",
          data: load(),
          error: null,
        });
      } catch {
        setState({
          status: "error",
          data: null,
          error: "Unable to load data. Please try again.",
        });
      }
    }, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [delayMs, load, requestId]);

  const retry = useCallback(() => {
    setState({
      status: "loading",
      data: null,
      error: null,
    });
    setRequestId((value) => value + 1);
  }, []);

  return {
    status: state.status,
    data: state.data,
    error: state.error,
    retry,
  };
}
