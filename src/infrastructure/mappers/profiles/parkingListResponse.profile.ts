import { Mapper, createMap, forMember, mapFrom } from '@automapper/core'
import ParkingDto from '../../../domain/entities/parking.entity'
import ParkingInfoResponse from '../../../application/dtos/parkingInfoResponse.dto'
import dateToMinutes from '../../utils/date.utils'

export default function ParkingListResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ParkingDto,
    ParkingInfoResponse,
    forMember(
      (d) => d.plate,
      mapFrom((s) => s.plate)
    ),
    forMember(
      (d) => d.paid,
      mapFrom((s) => s.paid ?? false)
    ),
    forMember(
      (d) => d.left,
      mapFrom((s) => (s.exitDate ? true : false))
    ),
    forMember(
      (d) => d.time,
      mapFrom((s) =>
        s.entranceDate ? dateToMinutes(s.entranceDate, s?.exitDate) : null
      )
    )
  )
}
