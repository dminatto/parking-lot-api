import ParkingCreateRequest from '../../../../application/dtos/parkingCreateRequest.dto'
import IParkingEntranceUsecase from '../../../../application/interfaces/usecases/parkingEntrance.interface'
import IParkingRepository from '../../../../application/interfaces/repositories/parking.interface'
import ParkingRepository from '../../../../infrastructure/repositories/parking.repository'
import ParkingEntity from '../../../entities/parking.entity'
import ParkingCreateResponse from '../../../../application/dtos/parkingCreateResponse.dto'
import mapper from '../../../../infrastructure/mappers/index.mapper'

class ParkingEntranceUsecase implements IParkingEntranceUsecase {
  private parkingRepository: IParkingRepository

  constructor() {
    this.parkingRepository = new ParkingRepository()
  }

  async execute(model: ParkingCreateRequest): Promise<ParkingCreateResponse> {
    try {
      const result = await this.parkingRepository.create(model)

      return mapper.mapAsync(result, ParkingEntity, ParkingCreateResponse)
    } catch (err: any) {
      console.error(`Error: ${err.message}`)
      throw new Error('Method not implemented.')
    }
  }
}

export default ParkingEntranceUsecase
