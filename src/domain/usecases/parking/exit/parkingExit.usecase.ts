import ParkingInfoResponse from '../../../../application/dtos/parkingInfoResponse.dto'
import {
  ParkingError,
  ErrorCodes
} from '../../../../application/helpers/error.helper'
import IParkingRepository from '../../../../application/interfaces/repositories/parking.interface'
import IParkingExitUsecase from '../../../../application/interfaces/usecases/parkingExit.interface'
import mapper from '../../../../infrastructure/mappers/index.mapper'
import ParkingRepository from '../../../../infrastructure/repositories/parking.repository'
import ParkingEntity from '../../../entities/parking.entity'

class ParkingExitUsecase implements IParkingExitUsecase {
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

    if (!parkingRecord.paid) {
      throw new ParkingError({
        name: ErrorCodes.PARKING_NOT_PAID,
        message: 'Parking fee has not been paid.',
        statusCode: 402
      })
    }

    const result = await this.parkingRepository.update(id, {
      exitDate: new Date()
    })

    return mapper.mapAsync(result, ParkingEntity, ParkingInfoResponse)
  }
}

export default ParkingExitUsecase
