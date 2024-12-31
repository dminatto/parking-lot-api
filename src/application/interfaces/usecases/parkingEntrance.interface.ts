import ParkingCreateRequest from '../../dtos/parkingCreateRequest.dto'
import ParkingCreateResponse from '../../dtos/parkingCreateResponse.dto'

interface IParkingEntranceUsecase {
  execute: (model: ParkingCreateRequest) => Promise<ParkingCreateResponse> //Result<any, BaseError> //Promise<ParkingDto>
}

export default IParkingEntranceUsecase
