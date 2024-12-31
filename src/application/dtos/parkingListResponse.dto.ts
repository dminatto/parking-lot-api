import { AutoMap } from '@automapper/classes'

export class ParkingListResponseData {
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

export default class ParkingListResponse {
  data!: ParkingListResponseData[]
}
