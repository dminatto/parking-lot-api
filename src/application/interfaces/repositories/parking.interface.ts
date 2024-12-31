import ParkingCreateRequest from '../../dtos/parkingCreateRequest.dto'
import ParkingEntity from '../../../domain/entities/parking.entity'
import ParkingUpdateRequest from '../../dtos/parkingUpdateRequest.dto'
interface IParkingRepository {
  list: (plate: string, page: number, limit: number) => Promise<ParkingEntity[]>
  create: (item: ParkingCreateRequest) => Promise<ParkingEntity>
  update: (_id: string, item: ParkingUpdateRequest) => Promise<ParkingEntity>
}

export default IParkingRepository
