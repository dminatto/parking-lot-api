import { Mapper, createMap, forMember, mapFrom } from '@automapper/core'
import ParkingCreateResponse from '../../../application/dtos/parkingCreateResponse.dto'
import ParkingEntity from '../../../domain/entities/parking.entity'

export default function ParkingCreateResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ParkingEntity,
    ParkingCreateResponse,
    forMember(
      (d) => d.id,
      mapFrom((s) => s._id)
    ),
    forMember(
      (d) => d.plate,
      mapFrom((s) => s.plate)
    ),
    forMember(
      (d) => d.entranceDate,
      mapFrom((s) => s.entranceDate)
    )
  )
}
