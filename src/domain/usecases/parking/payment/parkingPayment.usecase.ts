import ParkingInfoResponse from '../../../../application/dtos/parkingInfoResponse.dto'
import {
  ParkingError,
  ErrorCodes
} from '../../../../application/helpers/error.helper'
import IParkingRepository from '../../../../application/interfaces/repositories/parking.interface'
import IParkingPaymentUsecase from '../../../../application/interfaces/usecases/parkingPayment.interface'
import mapper from '../../../../infrastructure/mappers/index.mapper'
import ParkingRepository from '../../../../infrastructure/repositories/parking.repository'
import ParkingEntity from '../../../entities/parking.entity'

class ParkingPaymentUsecase implements IParkingPaymentUsecase {
  private parkingRepository: IParkingRepository

  constructor() {
    this.parkingRepository = new ParkingRepository()
  }

  async execute(id: string): Promise<ParkingInfoResponse> {
    const parkingRecord = await this.parkingRepository.findById(id)

    if (!parkingRecord) {
      throw new ParkingError({
        name: ErrorCodes.PARKING_RECORD_NOT_FOUND,
        message: 'Parking record not found.',
        statusCode: 404
      })
    }

    if (parkingRecord.paid) {
      throw new ParkingError({
        name: ErrorCodes.PARKING_ALREADY_PAID,
        message: 'Parking fee has already been paid.',
        statusCode: 400
      })
    }

    const result = await this.parkingRepository.update(id, {
      paid: true
    })

    return mapper.mapAsync(result, ParkingEntity, ParkingInfoResponse)
  }
}

export default ParkingPaymentUsecase
