import ParkingInfoResponse from '../../../../application/dtos/parkingInfoResponse.dto'
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
    const result = await this.parkingRepository.update(id, {
      paid: true
    })

    return mapper.mapAsync(result, ParkingEntity, ParkingInfoResponse)
  }
}

export default ParkingPaymentUsecase
