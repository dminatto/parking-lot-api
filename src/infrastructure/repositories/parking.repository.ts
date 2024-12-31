import mapper from './../mappers/index.mapper'
import * as mongoose from 'mongoose'
import Parking from '../models/parking.model'
import ParkingEntity from '../../domain/entities/parking.entity'
import ParkingCreateRequest from '../../application/dtos/parkingCreateRequest.dto'
import IParkingRepository from '../../application/interfaces/repositories/parking.interface'
import ParkingUpdateRequest from '../../application/dtos/parkingUpdateRequest.dto'

class ParkingRepository implements IParkingRepository {
  async create(item: ParkingCreateRequest): Promise<ParkingEntity> {
    var data = new Parking(item)
    data.save()
    return mapper.mapAsync(data, Parking, ParkingEntity)
  }

  async list(plate: string): Promise<ParkingEntity[]> {
    var data = await Parking.find({ plate })
    return mapper.mapArrayAsync(data, Parking, ParkingEntity)
  }

  async update(
    _id: string,
    item: ParkingUpdateRequest
  ): Promise<ParkingEntity> {
    var data = await Parking.findByIdAndUpdate(
      _id,
      { $set: { ...item } },
      { new: true }
    )

    return mapper.mapAsync(data, Parking, ParkingEntity)
  }

  delete(_id: number, callback: (error: any, result: any) => void): void {
    Parking.findByIdAndDelete(_id, callback)
  }
}

export default ParkingRepository
