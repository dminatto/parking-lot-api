import ParkingDto from '../dtos/parking.dto'

interface IParkingRepository {
  list: () => Promise<ParkingDto>
  create: (
    item: ParkingDto,
    callback: (error: any, result: any) => void
  ) => void
  update: (
    _id: number,
    item: ParkingDto,
    callback: (error: any, result: any) => void
  ) => void
  delete: (_id: number, callback: (error: any, result: any) => void) => void
}

export default IParkingRepository
