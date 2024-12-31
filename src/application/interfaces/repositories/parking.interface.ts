import ParkingCreateRequest from '../../dtos/parkingCreateRequest.dto'
import ParkingEntity from '../../../domain/entities/parking.entity'
interface IParkingRepository {
  list: (plate: string) => Promise<ParkingEntity[]>
  create: (item: ParkingCreateRequest) => Promise<ParkingEntity>
  update: (
    _id: number,
    item: ParkingEntity,
    callback: (error: any, result: any) => void
  ) => void
  delete: (_id: number, callback: (error: any, result: any) => void) => void
}

export default IParkingRepository
