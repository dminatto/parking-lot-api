import ParkingInfoResponse from '../../dtos/parkingInfoResponse.dto'

interface IParkingPaymentUsecase {
  execute: (id: string) => Promise<ParkingInfoResponse>
}

export default IParkingPaymentUsecase
