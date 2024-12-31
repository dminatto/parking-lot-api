import { Mapper, createMap, forMember, mapFrom } from '@automapper/core'
import Parking from '../../models/parking.model'
import ParkingDto from '../../../domain/entities/parking.entity'

export default function ParkingProfile(mapper: Mapper) {
  createMap(
    mapper,
    Parking,
    ParkingDto,
    forMember(
      (d) => d._id,
      mapFrom((s) => s._id)
    ),
    forMember(
      (d) => d.plate,
      mapFrom((s) => s.plate)
    ),
    forMember(
      (d) => d.paid,
      mapFrom((s) => s.paid)
    ),
    forMember(
      (d) => d.entranceDate,
      mapFrom((s) => s.entranceDate)
    ),
    forMember(
      (d) => d.exitDate,
      mapFrom((s) => s.exitDate)
    )
  )
}
