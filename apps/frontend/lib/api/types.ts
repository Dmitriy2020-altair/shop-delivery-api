import type { paths } from "./generated";

/**
 * Convenient aliases derived from the OpenAPI-generated contract.
 * Prefer these over hand-written response types when the schema covers them.
 */
export type HealthResponse =
  paths["/health"]["get"]["responses"][200]["content"]["application/json"];
