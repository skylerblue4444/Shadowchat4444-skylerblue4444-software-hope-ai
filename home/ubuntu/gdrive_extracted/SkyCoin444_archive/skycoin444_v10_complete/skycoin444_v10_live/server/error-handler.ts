import { TRPCError } from "@trpc/server";

/**
 * Custom error types for SkyCoin444 v10
 */
export enum ErrorCode {
  // Auth errors
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  SESSION_EXPIRED = "SESSION_EXPIRED",

  // Validation errors
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_FIELD = "MISSING_FIELD",
  INVALID_FORMAT = "INVALID_FORMAT",

  // Resource errors
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  CONFLICT = "CONFLICT",

  // Business logic errors
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  INVALID_ORDER = "INVALID_ORDER",
  TRADE_FAILED = "TRADE_FAILED",
  VAULT_LOCKED = "VAULT_LOCKED",

  // System errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
  RATE_LIMIT = "RATE_LIMIT",
}

interface ErrorContext {
  code: ErrorCode;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
  userId?: string;
  timestamp: number;
}

/**
 * Custom error class
 */
export class AppError extends Error {
  public code: ErrorCode;
  public statusCode: number;
  public details?: Record<string, unknown>;
  public timestamp: number;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = Date.now();
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toContext(userId?: string): ErrorContext {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      userId,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Error handler utilities
 */
export const errorHandler = {
  /**
   * Convert AppError to TRPC error
   */
  toTRPCError(error: AppError): TRPCError {
    const codeMap: Record<ErrorCode, "UNAUTHORIZED" | "FORBIDDEN" | "BAD_REQUEST" | "NOT_FOUND" | "CONFLICT" | "INTERNAL_SERVER_ERROR"> = {
      [ErrorCode.UNAUTHORIZED]: "UNAUTHORIZED",
      [ErrorCode.FORBIDDEN]: "FORBIDDEN",
      [ErrorCode.SESSION_EXPIRED]: "UNAUTHORIZED",
      [ErrorCode.INVALID_INPUT]: "BAD_REQUEST",
      [ErrorCode.MISSING_FIELD]: "BAD_REQUEST",
      [ErrorCode.INVALID_FORMAT]: "BAD_REQUEST",
      [ErrorCode.NOT_FOUND]: "NOT_FOUND",
      [ErrorCode.ALREADY_EXISTS]: "CONFLICT",
      [ErrorCode.CONFLICT]: "CONFLICT",
      [ErrorCode.INSUFFICIENT_BALANCE]: "BAD_REQUEST",
      [ErrorCode.INVALID_ORDER]: "BAD_REQUEST",
      [ErrorCode.TRADE_FAILED]: "BAD_REQUEST",
      [ErrorCode.VAULT_LOCKED]: "FORBIDDEN",
      [ErrorCode.INTERNAL_ERROR]: "INTERNAL_SERVER_ERROR",
      [ErrorCode.DATABASE_ERROR]: "INTERNAL_SERVER_ERROR",
      [ErrorCode.EXTERNAL_SERVICE_ERROR]: "INTERNAL_SERVER_ERROR",
      [ErrorCode.RATE_LIMIT]: "BAD_REQUEST",
    };

    return new TRPCError({
      code: codeMap[error.code],
      message: error.message,
      cause: error.details,
    });
  },

  /**
   * Validate required fields
   */
  validateRequired(
    data: Record<string, unknown>,
    fields: string[]
  ): void {
    const missing = fields.filter((field) => !data[field]);
    if (missing.length > 0) {
      throw new AppError(
        ErrorCode.MISSING_FIELD,
        `Missing required fields: ${missing.join(", ")}`,
        400,
        { missing }
      );
    }
  },

  /**
   * Validate email format
   */
  validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError(
        ErrorCode.INVALID_FORMAT,
        "Invalid email format",
        400,
        { field: "email" }
      );
    }
  },

  /**
   * Validate amount (positive number)
   */
  validateAmount(amount: number, fieldName: string = "amount"): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new AppError(
        ErrorCode.INVALID_INPUT,
        `${fieldName} must be a positive number`,
        400,
        { field: fieldName, value: amount }
      );
    }
  },

  /**
   * Check authorization
   */
  requireAuth(user: unknown): void {
    if (!user) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Authentication required",
        401
      );
    }
  },

  /**
   * Check sufficient balance
   */
  checkBalance(balance: number, required: number, currency: string = "SKY"): void {
    if (balance < required) {
      throw new AppError(
        ErrorCode.INSUFFICIENT_BALANCE,
        `Insufficient ${currency} balance. Required: ${required}, Available: ${balance}`,
        400,
        { balance, required, currency }
      );
    }
  },

  /**
   * Handle database errors
   */
  handleDatabaseError(error: unknown): never {
    console.error("[Database Error]", error);
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      "Database operation failed",
      500,
      { originalError: error instanceof Error ? error.message : String(error) }
    );
  },

  /**
   * Handle external service errors
   */
  handleServiceError(serviceName: string, error: unknown): never {
    console.error(`[${serviceName} Error]`, error);
    throw new AppError(
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      `${serviceName} service error`,
      503,
      {
        service: serviceName,
        originalError: error instanceof Error ? error.message : String(error),
      }
    );
  },

  /**
   * Rate limiting check
   */
  checkRateLimit(
    key: string,
    limit: number,
    window: number,
    store: Map<string, { count: number; resetTime: number }>
  ): void {
    const now = Date.now();
    const record = store.get(key);

    if (!record || now > record.resetTime) {
      store.set(key, { count: 1, resetTime: now + window });
      return;
    }

    if (record.count >= limit) {
      throw new AppError(
        ErrorCode.RATE_LIMIT,
        `Rate limit exceeded. Try again in ${Math.ceil((record.resetTime - now) / 1000)}s`,
        429,
        { limit, window, resetTime: record.resetTime }
      );
    }

    record.count++;
  },
};

/**
 * Logger utility
 */
export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || "");
  },

  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || "");
  },

  error: (message: string, error?: unknown) => {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      error instanceof Error ? error.message : error || ""
    );
  },

  debug: (message: string, data?: unknown) => {
    if (process.env.DEBUG) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || "");
    }
  },

  logError: (context: ErrorContext) => {
    const logMessage = `[${context.code}] ${context.message} (User: ${context.userId || "anonymous"})`;
    if (context.statusCode >= 500) {
      logger.error(logMessage, context.details);
    } else {
      logger.warn(logMessage, context.details);
    }
  },
};

/**
 * Async error wrapper for tRPC procedures
 */
export function asyncHandler<T>(
  fn: () => Promise<T>
): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof AppError) {
        throw errorHandler.toTRPCError(error);
      }
      logger.error("Unhandled error", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      });
    }
  };
}

export default {
  AppError,
  ErrorCode,
  errorHandler,
  logger,
  asyncHandler,
};
