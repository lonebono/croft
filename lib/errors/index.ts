// lib/errors/index.ts
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class SupabaseQueryError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, "SUPABASE_QUERY_ERROR", cause);
    this.name = "SupabaseQueryError";
  }
}

export class AuthError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, "AUTH_ERROR", cause);
    this.name = "AuthError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, "VALIDATION_ERROR", cause);
    this.name = "ValidationError";
  }
}
