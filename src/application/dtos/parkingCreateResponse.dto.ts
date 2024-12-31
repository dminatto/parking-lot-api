import { AutoMap } from '@automapper/classes'

export default class ParkingCreateResponse {
  @AutoMap()
  id!: string

  @AutoMap()
  plate!: string

  @AutoMap()
  entranceDate!: Date
}
