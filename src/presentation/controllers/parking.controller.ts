import { Request, Response } from 'express'
import ParkingCreateRequest from '../../application/dtos/parkingCreateRequest.dto'
import IParkingEntranceUsecase from '../../application/interfaces/usecases/parkingEntrance.interface'
import IParkingExitUsecase from '../../application/interfaces/usecases/parkingExit.interface'
import IParkingListUsecase from '../../application/interfaces/usecases/parkingList.interface'
import IParkingPaymentUsecase from '../../application/interfaces/usecases/parkingPayment.interface'
import ParkingEntranceUsecase from '../../domain/usecases/parking/entrance/parkingEntrance.usecase'
import ParkingExitUsecase from '../../domain/usecases/parking/exit/parkingExit.usecase'
import ParkingListUsecase from '../../domain/usecases/parking/list/parkingList.usecase'
import ParkingPaymentUsecase from '../../domain/usecases/parking/payment/parkingPayment.usecase'
import {
  ErrorCodes,
  ParkingError
} from '../../application/helpers/error.helper'

class ParkingController {
  private parkingEntranceUsecase: IParkingEntranceUsecase
  private parkingExitUsecase: IParkingExitUsecase
  private parkingListUsecase: IParkingListUsecase
  private parkingPaymentUsecase: IParkingPaymentUsecase

  constructor() {
    this.parkingEntranceUsecase = new ParkingEntranceUsecase()
    this.parkingExitUsecase = new ParkingExitUsecase()
    this.parkingListUsecase = new ParkingListUsecase()
    this.parkingPaymentUsecase = new ParkingPaymentUsecase()
  }

  create(data: ParkingCreateRequest, res: Response) {
    return this.parkingEntranceUsecase
      .execute(data)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => {
        if (err instanceof ParkingError) {
          const { message, statusCode, name } = err
          return res.status(statusCode).json({ name, message })
        }

        return res.status(500).json({
          name: ErrorCodes.FATAL_ERROR,
          message: 'Internal Server Error'
        })
      })
  }

  list(plate: string, res: Response, page?: number, limit?: number) {
    return this.parkingListUsecase
      .execute(plate, page, limit)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => {
        if (err instanceof ParkingError) {
          const { message, statusCode, name } = err
          return res.status(statusCode).json({ name, message })
        }

        return res.status(500).json({
          name: ErrorCodes.FATAL_ERROR,
          message: 'Internal Server Error'
        })
      })
  }

  exit(id: string, res: Response) {
    return this.parkingExitUsecase
      .execute(id)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => {
        if (err instanceof ParkingError) {
          const { message, statusCode, name } = err
          return res.status(statusCode).json({ name, message })
        }

        return res.status(500).json({
          name: ErrorCodes.FATAL_ERROR,
          message: 'Internal Server Error'
        })
      })
  }

  payment(id: string, res: Response) {
    return this.parkingPaymentUsecase
      .execute(id)
      .then((result) => res.status(200).json({ result }))
      .catch((err) => {
        if (err instanceof ParkingError) {
          const { message, statusCode, name } = err
          return res.status(statusCode).json({ name, message })
        }

        return res.status(500).json({
          name: ErrorCodes.FATAL_ERROR,
          message: 'Internal Server Error'
        })
      })
  }
}

export default ParkingController
