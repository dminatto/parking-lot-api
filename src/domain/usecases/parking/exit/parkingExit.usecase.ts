import ParkingInfoResponse from '../../../../application/dtos/parkingInfoResponse.dto'
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
    const result = await this.parkingRepository.update(id, {
      exitDate: new Date()
    })

    return mapper.mapAsync(result, ParkingEntity, ParkingInfoResponse)
  }
}

export default ParkingExitUsecase
