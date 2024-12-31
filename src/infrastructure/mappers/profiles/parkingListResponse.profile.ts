import { Mapper, createMap, forMember, mapFrom } from '@automapper/core'
import ParkingDto from '../../../domain/entities/parking.entity'
import { ParkingListResponseData } from '../../../application/dtos/parkingListResponse.dto'

export default function ParkingListResponseProfile(mapper: Mapper) {
  createMap(
    mapper,
    ParkingDto,
    ParkingListResponseData,
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
      mapFrom((s) => diffDate(s.entranceDate))
    )
  )
}

//todo: REFACTOR

function diffDate(entrance: Date, exit?: Date) {
  var timeLimit = exit ?? new Date()

  var diff = Math.abs(entrance.getTime() - timeLimit.getTime())
  var minutes = Math.floor(diff / 1000 / 60)
  return minutes + ' minutes'
}
