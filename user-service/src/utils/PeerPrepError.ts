import { HttpStatusCode } from './httpStatusCode';

/**
 * Class representing server errors in PeerPrep application
 *
 * @extends Error
 */
export class PeerPrepError extends Error {
  statusCode: HttpStatusCode;
  message: string;

  /**
   * Creates a PeerPrepError
   *
   * @param statusCode HTTP Status Code corresponding to the error
   * @param message Description of the error
   */
  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, PeerPrepError.prototype);
  }
}
