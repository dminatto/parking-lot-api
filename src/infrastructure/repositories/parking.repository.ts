import mapper from './../mappers/index.mapper'
import * as mongoose from 'mongoose'
import Parking from '../models/parking.model'
import ParkingEntity from '../../domain/entities/parking.entity'
import ParkingCreateRequest from '../../application/dtos/parkingCreateRequest.dto'
import IParkingRepository from '../../application/interfaces/repositories/parking.interface'

class ParkingRepository implements IParkingRepository {
  async create(item: ParkingCreateRequest): Promise<ParkingEntity> {
    const newParking = new Parking(item)
    newParking.save()
    return mapper.mapAsync(newParking, Parking, ParkingEntity)
  }

  async list(plate: string): Promise<ParkingEntity[]> {
    const data = await Parking.find({ plate })
    return mapper.mapArrayAsync(data, Parking, ParkingEntity)
  }

  update(
    _id: number,
    item: ParkingEntity,
    callback: (error: any, result: any) => void
  ): void {
    Parking.findByIdAndUpdate(
      _id,
      { $set: { ...item, updatedDate: new Date() } },
      { new: true }
    )
  }

  delete(_id: number, callback: (error: any, result: any) => void): void {
    Parking.findByIdAndDelete(_id, callback)
  }
}

export default ParkingRepository
