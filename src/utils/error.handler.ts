/**
 * Base Error Class
 */
export class BaseError extends Error {
  public payload: object | undefined;

  public status: string | undefined;

  constructor(code: string, message: string, data?: object | undefined) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = code;
    this.payload = data;
  }
}

export class BadRequestError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class AuthFailureError extends BaseError {}

export class InternalError extends BaseError {}

export class NotFoundError extends BaseError {}
