import ParkingInfoResponse from '../../../../application/dtos/parkingInfoResponse.dto'
import ParkingListResponse from '../../../../application/dtos/parkingListResponse.dto'
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

  async execute(
    plate: string,
    page?: number,
    limit?: number
  ): Promise<ParkingListResponse> {
    const _page = page ?? 1
    const _limit = limit ?? 10
    const result = await this.parkingRepository.list(plate, _page, _limit)

    /*  if(result === null || result typeof ParkingEntity){

    }*/
    console.log('result', result)
    var response = new ParkingListResponse()
    response.page = _page
    response.data = await mapper.mapArrayAsync(
      result,
      ParkingEntity,
      ParkingInfoResponse
    )
    return response
  }
}

export default ParkingListUsecase
