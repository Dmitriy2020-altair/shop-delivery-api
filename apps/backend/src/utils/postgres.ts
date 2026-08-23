export interface PostgresError {
  code: string;
  constraint?: string;
  detail?: string;
}

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string'
  );
}
