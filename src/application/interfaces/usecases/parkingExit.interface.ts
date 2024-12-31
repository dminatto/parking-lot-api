import ParkingInfoResponse from '../../dtos/parkingInfoResponse.dto'

interface IParkingExitUsecase {
  execute: (id: string) => Promise<ParkingInfoResponse>
}

export default IParkingExitUsecase
