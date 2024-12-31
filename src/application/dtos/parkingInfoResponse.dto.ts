import { AutoMap } from '@automapper/classes'

export default class ParkingInfoResponse {
  @AutoMap()
  id!: string

  @AutoMap()
  plate!: string

  @AutoMap()
  time!: string

  @AutoMap()
  paid!: boolean

  @AutoMap()
  left!: boolean
}
