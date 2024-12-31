import { AutoMap } from '@automapper/classes'
import ParkingInfoResponse from './parkingInfoResponse.dto'

export default class ParkingListResponse {
  data!: ParkingInfoResponse[]
}
