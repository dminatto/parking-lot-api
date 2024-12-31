import ParkingListResponse from '../../dtos/parkingListResponse.dto'

interface IParkingListUsecase {
  execute: (
    plate: string,
    page?: number,
    limit?: number
  ) => Promise<ParkingListResponse>
}

export default IParkingListUsecase
