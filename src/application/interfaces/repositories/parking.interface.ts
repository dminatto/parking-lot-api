import ParkingCreateRequest from '../../dtos/parkingCreateRequest.dto'
import ParkingEntity from '../../../domain/entities/parking.entity'
import ParkingUpdateRequest from '../../dtos/parkingUpdateRequest.dto'
interface IParkingRepository {
  list: (plate: string) => Promise<ParkingEntity[]>
  create: (item: ParkingCreateRequest) => Promise<ParkingEntity>
  update: (_id: string, item: ParkingUpdateRequest) => Promise<ParkingEntity>
  delete: (_id: number, callback: (error: any, result: any) => void) => void
}

export default IParkingRepository
