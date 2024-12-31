import ParkingListResponse from '../../dtos/parkingListResponse.dto'

interface IParkingListUsecase {
  execute: (plate: string) => Promise<ParkingListResponse>
}

export default IParkingListUsecase
