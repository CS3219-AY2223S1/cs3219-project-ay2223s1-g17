import { HttpStatusCode } from './HttpsStatusCode';

/**
 * Class representing server errors in PeerPrep application
 * @extends Error
 */
export class PeerPrepError extends Error {
  statusCode: HttpStatusCode;
  message: string;

  /**
   * Create a PeerPrepError
   *
   * @param statusCode HTTP Status Code corresponding to the error
   * @param message Description or outline of the error
   */
  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, PeerPrepError.prototype);
  }
}
