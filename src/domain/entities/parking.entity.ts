import { AutoMap } from '@automapper/classes'

export default class ParkingEntity {
  @AutoMap()
  _id!: string

  @AutoMap()
  plate!: string

  @AutoMap()
  paid!: boolean

  @AutoMap()
  entranceDate!: Date

  @AutoMap()
  exitDate!: Date
}
