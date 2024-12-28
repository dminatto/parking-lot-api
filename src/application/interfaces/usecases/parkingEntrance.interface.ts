import ParkingDto from '../dtos/parking.dto'

interface IParkingEntranceUsecase {
  execute: (model: ParkingDto) => Promise<ParkingDto>
}

export default IParkingEntranceUsecase
