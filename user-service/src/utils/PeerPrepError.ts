import { HttpStatusCode } from './HttpsStatusCode'

export class PeerPrepError extends Error {
  statusCode: HttpStatusCode
  message: string

  constructor(statusCode: HttpStatusCode, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    Object.setPrototypeOf(this, PeerPrepError.prototype)
  }
}
