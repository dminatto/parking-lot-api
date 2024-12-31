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
      .then((a) => res.status(200).json({ result: a }))
      .catch((err) => res.status(400).json({ result: err }))
  }

  list(plate: string, res: Response) {
    return this.parkingListUsecase
      .execute(plate)
      .then((crushs) => res.status(200).json({ result: crushs }))
      .catch((err) => res.status(400).json({ result: err }))
  }
}

export default ParkingController
