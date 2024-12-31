import ParkingListResponse, {
  ParkingListResponseData
} from '../../../../application/dtos/parkingListResponse.dto'
import IParkingRepository from '../../../../application/interfaces/repositories/parking.interface'
import IParkingListUsecase from '../../../../application/interfaces/usecases/parkingList.interface'
import mapper from '../../../../infrastructure/mappers/index.mapper'
import ParkingRepository from '../../../../infrastructure/repositories/parking.repository'
import ParkingEntity from '../../../entities/parking.entity'

class ParkingListUsecase implements IParkingListUsecase {
  private parkingRepository: IParkingRepository

  constructor() {
    this.parkingRepository = new ParkingRepository()
  }

  async execute(plate: string): Promise<ParkingListResponse> {
    const result = await this.parkingRepository.list(plate)

    /*  if(result === null || result typeof ParkingEntity){

    }*/

    var response = new ParkingListResponse()
    response.data = await mapper.mapArrayAsync(
      result,
      ParkingEntity,
      ParkingListResponseData
    )
    return response
  }
}

export default ParkingListUsecase
