export class ErrorBase<T extends string> extends Error {
  name: T
  message: string
  statusCode: number
  cause: any

  constructor({
    name,
    message,
    statusCode,
    cause
  }: {
    name: T
    message: string
    statusCode: number
    cause?: any
  }) {
    super()
    this.name = name
    this.message = message
    this.statusCode = statusCode
    this.cause = cause
  }
}

export enum ErrorCodes {
  PARKING_NOT_PAID = 'PARKING_NOT_PAID',
  PARKING_RECORD_NOT_FOUND = 'PARKING_RECORD_NOT_FOUND',
  PARKING_ALREADY_PAID = 'PARKING_ALREADY_PAID',
  FATAL_ERROR = 'FATAL_ERROR'
}

export class ParkingError extends ErrorBase<ErrorCodes> {}
