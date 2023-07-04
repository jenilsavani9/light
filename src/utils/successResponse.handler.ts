/**
 * Success response handler class
 */
export class SuccessResponse {
  constructor(success: boolean, message: string, code: number, data?: any) {
    return {
      success: success,
      message: message,
      status: code,
      payload: data,
    };
  }
}